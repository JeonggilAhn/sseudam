package elevenjo.ssdam.domain.saving.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import elevenjo.ssdam.global.externalApi.dto.HeaderResponseDto;
import lombok.Getter;

@Getter
public class OpenSavingApiResponse {

    @JsonProperty("Header")
    private HeaderResponseDto header;

    @JsonProperty("REC")
    private OpenSavingResponseDto rec;
}
