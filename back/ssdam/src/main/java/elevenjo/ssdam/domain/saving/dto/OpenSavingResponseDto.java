package elevenjo.ssdam.domain.saving.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OpenSavingResponseDto {
    private String bankCode;
    private String bankName;
    private String accountName;
    private String subscriptionPeriod;
    private String interestRate;
    private String accountCreateDate;
    private String accountExpiryDate;
    private Long depositBalance;
}
