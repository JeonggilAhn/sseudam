package elevenjo.ssdam.domain.saving.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OpenSavingResponseDto {
    private String accountTypeUniqueNo;
    private String bankCode;
    private String bankName;
    private String accountTypeCode;
    private String accountTypeName;
    private String accountName;
    private String accountDescription;
    private String subscriptionPeriod;
    private String minSubscriptionBalance;
    private String maxSubscriptionBalance;
    private String interestRate;
    private String rateDescription;
}
