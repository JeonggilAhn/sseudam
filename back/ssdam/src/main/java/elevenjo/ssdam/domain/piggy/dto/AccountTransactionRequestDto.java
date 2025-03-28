package elevenjo.ssdam.domain.piggy.dto;

public record AccountTransactionRequestDto(
        String startDate,
        String endDate,
        String TransactionType,
        String orderByType
) {
}
