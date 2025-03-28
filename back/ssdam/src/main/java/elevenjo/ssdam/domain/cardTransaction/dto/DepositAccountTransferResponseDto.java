package elevenjo.ssdam.domain.cardTransaction.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import elevenjo.ssdam.global.externalApi.dto.HeaderResponseDto;

public record DepositAccountTransferResponseDto(
        @JsonProperty("Header") HeaderResponseDto header,
        @JsonProperty("REC") List<RecItemDto> rec
) {
    @JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
    public record RecItemDto(
            String transactionUniqueNo,
            String accountNo,
            String transactionDate,
            String transactionType,
            String transactionTypeName,
            String transactionAccountNo
    ) {}
}
