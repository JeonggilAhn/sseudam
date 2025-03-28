package elevenjo.ssdam.domain.card.service;

import elevenjo.ssdam.domain.card.dto.CardDto;

import java.util.List;

public interface CardService {
    void registerUserCard(CardDto userCard) throws Exception;
    void deleteUserCard(Long cardId);
    CardDto getUserCard(long userId) throws Exception;
}
