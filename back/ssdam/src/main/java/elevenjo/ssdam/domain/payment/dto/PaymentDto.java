package elevenjo.ssdam.domain.payment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import elevenjo.ssdam.global.externalApi.dto.HeaderResponseDto;

public record PaymentDto (
        @JsonProperty("Header") HeaderResponseDto header,
        @JsonProperty("REC") RecDto rec
) {
    public record RecDto(
            String transactionUniqueNo,
            String categoryId,
            String categoryName,
            String merchantId,
            String merchantName,
            String transactionDate,
            String transactionTime,
            String paymentBalance
    ) {}
}
