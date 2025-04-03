package elevenjo.ssdam.domain.card.service;

import elevenjo.ssdam.domain.card.dto.CardDto;
import elevenjo.ssdam.domain.user.entity.User;

import java.util.List;

public interface CardService {
    void registerUserCard(CardDto userCard, User user) throws Exception;
    void deleteUserCard(Long cardId);
    String[] getUserCard(long userId) throws Exception;
}
