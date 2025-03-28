package elevenjo.ssdam.domain.piggy.dto.external;

public record InquireTransactionHistoryRequestDto(
    String startDate,
    String endDate,
    String transactionType,
    String orderByType,
    String accountNo
) {
}
