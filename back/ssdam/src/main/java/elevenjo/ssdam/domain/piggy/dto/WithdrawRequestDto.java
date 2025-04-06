package elevenjo.ssdam.domain.piggy.dto;

public record WithdrawRequestDto(
        String accountNo,
        Long amount
) {
}
