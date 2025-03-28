package elevenjo.ssdam.domain.piggy.dto;

public record AccountTransactionRequestDto(
        String startDate,
        String endDate,
        String transactionType,
        String orderByType
) {
}
