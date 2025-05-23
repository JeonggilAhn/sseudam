package elevenjo.ssdam.domain.piggy.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import elevenjo.ssdam.domain.piggy.dto.TransactionHistoryDto;
import elevenjo.ssdam.global.externalApi.dto.HeaderResponseDto;


public record InquireTransactionHistoryResponseDto(
        @JsonProperty("Header") HeaderResponseDto header,
        @JsonProperty("REC") TransactionHistoryDto rec
) {}
