package elevenjo.ssdam.domain.card.service;

import elevenjo.ssdam.domain.card.dto.CardDto;

import java.util.List;

public interface CardService {
    void registerUserCard(CardDto userCard);
    void deleteUserCard(Long cardId);
    List<CardDto> getUserCardList(long userId);
}
