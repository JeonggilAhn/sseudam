package elevenjo.ssdam.domain.card.service;

import elevenjo.ssdam.domain.card.dto.CardDto;
import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.card.exception.CardDuplicateException;
import elevenjo.ssdam.domain.card.exception.CardNotFoundException;
import elevenjo.ssdam.domain.card.exception.UserNotFoundException;
import elevenjo.ssdam.domain.card.repository.CardRepository;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;

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
    public List<CardDto> getUserCardList(long userId) {
        List<CardDto> userCardList = cardRepository.findByUserId(userId);
        if (userCardList.isEmpty()){
            throw new UserNotFoundException();
        }
        return userCardList;
    }
}
