package elevenjo.ssdam.domain.piggy.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import elevenjo.ssdam.global.externalApi.dto.HeaderResponseDto;

public record InquireAccountResponseDto(
        @JsonProperty("Header") HeaderResponseDto header,
        @JsonProperty("REC") AccountDto rec

) {
    @JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
    public record AccountDto(
            String accountNo,
            String accountBalance
    ) {}
}
