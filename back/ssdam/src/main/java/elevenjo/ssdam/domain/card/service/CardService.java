package elevenjo.ssdam.domain.card.service;

import elevenjo.ssdam.domain.card.dto.CardDto;

public interface CardService {
    void registUserCard(CardDto userCard);
    void deleteUserCard(Long cardId);
}
