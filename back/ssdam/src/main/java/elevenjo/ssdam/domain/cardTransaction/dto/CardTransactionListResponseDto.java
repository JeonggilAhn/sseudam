package elevenjo.ssdam.domain.cardTransaction.dto;

import java.util.List;

public record CardTransactionListResponseDto(
    String cardIssuerName,
    String cardName,
    String cardNo,
    List<TransactionDetail> transactionList
) {
    public record TransactionDetail(
        String categoryName,
        String merchantName,
        String transactionDate,
        String transactionTime,
        String transactionBalance
    ) {
    }
}
