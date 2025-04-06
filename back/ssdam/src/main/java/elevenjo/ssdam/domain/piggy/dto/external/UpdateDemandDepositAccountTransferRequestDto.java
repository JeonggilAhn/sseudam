package elevenjo.ssdam.domain.piggy.dto.external;

public record UpdateDemandDepositAccountTransferRequestDto(
        String depositAccountNo,
        String depositTransactionSummary,
        String transactionBalance,
        String withdrawalAccountNo,
        String withdrawalTransactionSummary
) {

}
