package elevenjo.ssdam.domain.piggy.dto;

public record TransferContentDto(
        String transactionUniqueNo,
        String accountNo,
        String transactionDate,
        String transactionType,
        String transactionTypeName,
        String transactionAccountNo
) {
}
