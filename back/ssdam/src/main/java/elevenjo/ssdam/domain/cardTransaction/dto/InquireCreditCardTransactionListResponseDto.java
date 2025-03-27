package elevenjo.ssdam.domain.cardTransaction.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 외부 API JSON 응답 예시:
 * {
 *   "Header": { ... },
 *   "REC": {
 *     "cardIssuerCode": "...",
 *     "cardIssuerName": "...",
 *     "cardName": "...",
 *     "cardNo": "...",
 *     "cvc": "...",
 *     "estimatedBalance": "...",
 *     "transactionList": [
 *       { "transactionUniqueNo": "1709", "categoryId": "...", "merchantId": "...", ... }
 *     ]
 *   }
 * }
 */
public record InquireCreditCardTransactionListResponseDto(
    @JsonProperty("Header")
    Header header,
    @JsonProperty("REC")
    Rec rec
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

    public record Rec(
        String cardIssuerCode,
        String cardIssuerName,
        String cardName,
        String cardNo,
        String cvc,
        String estimatedBalance,
        List<TransactionDetail> transactionList
    ) {
        public record TransactionDetail(
            String transactionUniqueNo,
            String categoryId,
            String categoryName,
            String merchantId,
            String merchantName,
            String transactionDate,
            String transactionTime,
            String transactionBalance,
            String cardStatus,
            String billStatementsYn,
            String billStatementsStatus
        ) {
        }
    }
}
