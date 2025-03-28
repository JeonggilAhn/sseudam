package elevenjo.ssdam.domain.cardTransaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record OccurredCardTransactionRequestDto (
        @JsonProperty("userKey") String userKey,
        @JsonProperty("merchantName") String merchantName,
        @JsonProperty("paymentBalance") Integer paymentBalance
) {
}
