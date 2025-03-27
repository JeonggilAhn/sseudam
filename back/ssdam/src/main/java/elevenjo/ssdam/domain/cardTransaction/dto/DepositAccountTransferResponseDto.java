package elevenjo.ssdam.domain.cardTransaction.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import elevenjo.ssdam.global.externalApi.dto.HeaderResponseDto;

public record DepositAccountTransferResponseDto(
        @JsonProperty("Header") HeaderResponseDto header,
        @JsonProperty("REC") List<RecItemDto> rec
) {
    public record RecItemDto(
            String transactionUniqueNo,
            String accountNo,
            String transactionDate,
            String transactionType,
            String transactionTypeName,
            String transactionAccountNo
    ) {}
}
