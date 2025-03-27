package elevenjo.ssdam.domain.payment.dto;

public record CardTransactionDto (
        String userKey,
        String merchantName,
        Integer paymentBalance
) {

}
