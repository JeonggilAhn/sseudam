package elevenjo.ssdam.domain.card.service;

import elevenjo.ssdam.domain.card.dto.CardDto;
import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.card.exception.CardDuplicateException;
import elevenjo.ssdam.domain.card.exception.CardNotFoundException;
import elevenjo.ssdam.domain.card.exception.UserNotFoundException;
import elevenjo.ssdam.domain.card.repository.CardRepository;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import elevenjo.ssdam.global.decrypt.HybridDecryptor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final HybridDecryptor hybridDecryptor;

    @Override
    public void registerUserCard(CardDto userCard) {
        System.out.println(userCard.getUserId());
        System.out.println(userCard.getCardNo());
        System.out.println(userCard.getCvc());
        User user = userRepository.findById(userCard.getUserId())
                .orElseThrow(UserNotFoundException::new);

        Card card = Card.builder().cardNo(userCard.getCardNo())
                .cvc(userCard.getCvc()).user(user).build();

        if (!cardRepository.existsByCardNo(userCard.getCardNo())){
            cardRepository.save(card);
        }else{
            throw new CardDuplicateException();
        }

    }

    @Override
    public void deleteUserCard(Long cardId) {
        if (!cardRepository.findById(cardId).isPresent()){
            throw new CardNotFoundException();
        };
        cardRepository.deleteById(cardId);
    }



    @Override
    public CardDto getUserCard(long userId) throws Exception{
        Optional<Card> userCard = cardRepository.findByUserId(userId);
        if (userCard.isEmpty()){
            throw new UserNotFoundException();
        }
        HybridDecryptor.AESKeyInfo keyInfo = hybridDecryptor.decryptKeyInfo(userCard.get().getKeyInfo());
        CardDto tmpUserCard = new CardDto();
        tmpUserCard.setCardNo(hybridDecryptor.decryptWithAES(userCard.get().getCardNo() ,keyInfo));
        tmpUserCard.setCvc(hybridDecryptor.decryptWithAES(userCard.get().getCvc() ,keyInfo));
        tmpUserCard.setUserId(userId);
        return tmpUserCard;
    }
}
