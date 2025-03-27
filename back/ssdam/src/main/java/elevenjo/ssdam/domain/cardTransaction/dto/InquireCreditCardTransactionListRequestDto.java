package elevenjo.ssdam.domain.cardTransaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.ssafyApi.dto.HeaderRequestDto;

public record InquireCreditCardTransactionListRequestDto(
    @JsonProperty("Header")
    HeaderRequestDto headerRequestDto,
    String cardNo,
    String cvc,
    String startDate,
    String endDate
) {
    public static InquireCreditCardTransactionListRequestDto from(
        HeaderRequestDto headerRequestDto,
        Card card,
        String startDate,
        String endDate
    ) {
        return new InquireCreditCardTransactionListRequestDto(
            headerRequestDto,
            card.getCardNo(),
            card.getCvc(),
            startDate,
            endDate
        );
    }
}
