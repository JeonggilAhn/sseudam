package elevenjo.ssdam.domain.card.service;

import elevenjo.ssdam.domain.card.dto.CardDto;

import java.util.List;

public interface CardService {
    void registerUserCard(CardDto userCard) throws Exception;
    void deleteUserCard(Long cardId);
    String[] getUserCard(long userId) throws Exception;
}
