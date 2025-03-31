package elevenjo.ssdam.domain.card.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record CardResponseDto(
        @JsonProperty("Header")
        Header header,
        @JsonProperty("REC")
        List<MyCardInfo> rec
) {
    public record Header(
            String responseCode,
            String responseMessage,
            String apiName,
            String transmissionDate,
            String transmissionTime,
            String institutionCode,
            String apiKey,
            String apiServiceCode,
            String institutionTransactionUniqueNo
    ) {
    }


        public record MyCardInfo(
                @JsonProperty("cardNo") String cardNo,
                @JsonProperty("cvc") String cvc,
                @JsonProperty("cardUniqueNo") String cardUniqueNo,
                @JsonProperty("cardIssuerCode") String cardIssuerCode,
                String cardIssuerName,
                String cardName,
                String baselinePerformance,
                String maxBenefitLimit,
                String cardDescription,
                String cardExpiryDate,
                String withdrawalAccountNo,
                String withdrawalDate
        ) {
        }
}
