package elevenjo.ssdam.domain.piggy.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import elevenjo.ssdam.domain.piggy.dto.TransferContentDto;
import elevenjo.ssdam.global.externalApi.dto.HeaderResponseDto;

import java.util.List;

public record UpdateDemandDepositAccountTransferResponseDto(
        @JsonProperty("Header") HeaderResponseDto header,
        @JsonProperty("REC") List<TransferContentDto> rec
) {
}
