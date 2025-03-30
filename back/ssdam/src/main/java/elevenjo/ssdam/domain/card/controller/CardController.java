package elevenjo.ssdam.domain.card.controller;

import elevenjo.ssdam.domain.card.dto.CardRequestDto;
import elevenjo.ssdam.domain.card.exception.CardDuplicateException;
import elevenjo.ssdam.domain.card.exception.CardNotFoundException;
import elevenjo.ssdam.domain.card.exception.UserNotFoundException;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.externalApi.ExternalApiUtil;
import elevenjo.ssdam.global.response.DefaultResponseCode;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import lombok.RequiredArgsConstructor;
import elevenjo.ssdam.domain.card.dto.CardDto;
import elevenjo.ssdam.domain.card.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
public class CardController {
    private final CardService cardService;
    private final ExternalApiUtil externalApiUtil;

    @PostMapping("/")
    public ResponseEntity<ResponseWrapper<Void>> registerCard(@RequestBody CardDto card) throws Exception {
        try {
            cardService.registerUserCard(card);
            return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK,null);
        }catch (CardDuplicateException e){
            return ResponseWrapperFactory.setResponse(DefaultResponseCode.BAD_REQUEST,null);
        }catch (UserNotFoundException e){
            return ResponseWrapperFactory.setResponse(DefaultResponseCode.BAD_REQUEST,null);
        }
    };

    @PostMapping("/create")
    public <UserCardInfo> ResponseEntity<ResponseWrapper<Void>> createCard(@AuthenticationPrincipal User user,
                                                                           @RequestBody CardRequestDto createCardInfo){

        Map<String, String> cardInfoMap = new HashMap<>();
        cardInfoMap.put("cardUniqueNo",createCardInfo.getCardUniqueNo());
        cardInfoMap.put("withdrawalAccountNo",createCardInfo.getWithdrawalAccountNo());
        cardInfoMap.put("withdrawalDate",createCardInfo.getWithdrawalDate());

        try {
            externalApiUtil.postWithHeader("https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/createCreditCard",
                    "createCreditCard", "",cardInfoMap,Map.class);
            return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK,null);
        }catch (RuntimeException e){
            return ResponseWrapperFactory.setResponse(DefaultResponseCode.BAD_REQUEST,null);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<ResponseWrapper<Void>> deleteCard(@RequestBody long cardId){
        try {
            cardService.deleteUserCard(cardId);
            return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK,null);
        } catch (CardNotFoundException e) {
            return ResponseWrapperFactory.setResponse(DefaultResponseCode.BAD_REQUEST,null);
        }

    };

    @GetMapping("/{userId}")
    public ResponseEntity<String[]> getCardNumber(@PathVariable long userId) throws Exception{
        String[] userCard = cardService.getUserCard(userId);
        return ResponseEntity.ok(userCard);
    };

}
