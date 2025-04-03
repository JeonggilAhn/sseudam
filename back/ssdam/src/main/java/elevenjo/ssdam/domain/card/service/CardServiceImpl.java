package elevenjo.ssdam.domain.card.service;

import elevenjo.ssdam.domain.card.dto.CardDto;
import elevenjo.ssdam.domain.card.dto.CardResponseDto;
import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.card.exception.CardDuplicateException;
import elevenjo.ssdam.domain.card.exception.CardNotFoundException;
import elevenjo.ssdam.domain.card.exception.CardUserMismatchException;
import elevenjo.ssdam.domain.card.exception.UserNotFoundException;
import elevenjo.ssdam.domain.card.repository.CardRepository;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import elevenjo.ssdam.global.decrypt.HybridDecryptor;
import elevenjo.ssdam.global.externalApi.ExternalApiUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final HybridDecryptor hybridDecryptor;
    private final ExternalApiUtil externalApiUtil;

    @Override
    public void registerUserCard(CardDto userCard, User user) throws Exception {
        boolean isCardExist = false;
        long userId = user.getUserId();
        Map<String, String> map = new HashMap<>();
        String userKey = userRepository.findById(userId).get().getUserKey();
        User cardUser = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        HybridDecryptor.AESKeyInfo keyInfo = hybridDecryptor.decryptKeyInfo(userCard.getKeyInfo());
        String cardNo = hybridDecryptor.decryptWithAES(userCard.getCardNo(), keyInfo);
        String cvc = hybridDecryptor.decryptWithAES(userCard.getCvc(), keyInfo);
        String name = user.getUserName();

        CardResponseDto response = externalApiUtil.postWithHeader("https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/inquireSignUpCreditCardList","inquireSignUpCreditCardList",
                userKey,map, CardResponseDto.class);

        for (int i = 0; i < response.rec().size(); i++) {
            if(userCard.getUserName().equals(name)
                    && response.rec().get(i).cardNo().equals(cardNo)
                    && response.rec().get(i).cvc().equals(cvc)) {
                String dateStr = response.rec().get(i).cardExpiryDate();
                String month = dateStr.substring(4,6);
                String year = dateStr.substring(2, 4);
                String cardExpiryDate = month+year;

                if (cardExpiryDate.equals(userCard.getExpiryDate())) {
                    isCardExist = true;
                }
            }else{
                throw new CardUserMismatchException();
            }
        }

        if (isCardExist) {
            Card card = Card.builder().cardNo(userCard.getCardNo())
                    .cvc(userCard.getCvc()).keyInfo(userCard.getKeyInfo()).user(user).build();

            if (!cardRepository.existsByCardNo(userCard.getCardNo())){
                cardRepository.save(card);
            }else{
                throw new CardDuplicateException();
            }
        }
    }

    @Transactional
    @Override
    public void deleteUserCard(Long userId) {
        if (!cardRepository.findByUserId(userId).isPresent()) {
            System.out.println("No card found: " + userId);
            throw new CardNotFoundException();
        };
        cardRepository.deleteByUserId(userId);
    }

    @Override
    public String[] getUserCard(long userId) throws Exception{
        Optional<Card> userCard = cardRepository.findByUserId(userId);
        if (userCard.isEmpty()){
            throw new CardNotFoundException();
        }
        HybridDecryptor.AESKeyInfo keyInfo = hybridDecryptor.decryptKeyInfo(userCard.get().getKeyInfo());
        String cardNo = hybridDecryptor.decryptWithAES(userCard.get().getCardNo() ,keyInfo).replaceAll("[^0-9]+","");
        String first2Digit = cardNo.substring(0,2);
        String last4Digit = cardNo.substring(cardNo.length()-4);
        return new String[] {first2Digit, last4Digit};
    }
}
