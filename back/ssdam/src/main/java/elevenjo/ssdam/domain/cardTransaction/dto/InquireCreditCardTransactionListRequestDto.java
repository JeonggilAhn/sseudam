package elevenjo.ssdam.domain.cardTransaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.ssafyApi.dto.HeaderRequestDto;
import elevenjo.ssdam.global.decrypt.HybridDecryptor;


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
        String cardNo,
        String cvc,
        String startDate,
        String endDate
    ) throws Exception {
        return new InquireCreditCardTransactionListRequestDto(
            headerRequestDto,
            cardNo,
            cvc,
            startDate,
            endDate
        );
    }
}
