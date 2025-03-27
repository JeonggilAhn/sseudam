package elevenjo.ssdam.domain.payment.dto;

public record CardTransactionInfoDto(
    String cardNo,
    String cvc,
    String userKey
) {
}
