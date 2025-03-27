package elevenjo.ssdam.domain.card.controller;


import elevenjo.ssdam.global.ssafyApi.SsafyApiUtil;
import lombok.RequiredArgsConstructor;
import elevenjo.ssdam.domain.card.dto.CardDto;
import elevenjo.ssdam.domain.card.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class CardController {
    private final CardService cardService;
    private final SsafyApiUtil externalApiUtil;

    @PostMapping("/card")
    public ResponseEntity<Void> registerCard(@RequestBody CardDto card){
       cardService.registUserCard(card);
       return ResponseEntity.ok().build();
    };

    @PostMapping("/cards")
    public <UserCardInfo> ResponseEntity<Void> createCard(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> userCardInfo){

        externalApiUtil.postWithHeader("https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/createCreditCard","createCreditCard", "",userCardInfo, String);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/cards")
    public ResponseEntity<Void> deleteCard(@RequestBody long cardId){
        cardService.deleteUserCard(cardId);
        return ResponseEntity.ok().build();
    };


}
