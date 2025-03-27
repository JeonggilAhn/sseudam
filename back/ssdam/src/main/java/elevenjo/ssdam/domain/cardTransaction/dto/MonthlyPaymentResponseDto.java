package elevenjo.ssdam.domain.cardTransaction.dto;

/**
 * 이번 달 결제 금액 응답 DTO
 */
public record MonthlyPaymentResponseDto(
    long totalPayment
) {
}