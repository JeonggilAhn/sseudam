package elevenjo.ssdam.domain.payment.dto;

public record PaymentUserDto(
        Long userId,
        String userKey,
        String cardNo,
        String cvc
)  {
    public static PaymentUserDto from(
            Long userId,
            String userKey,
            String cardNo,
            String cvc
    ) {
        return  new PaymentUserDto(userId,  userKey, cardNo, cvc);
    }
}
