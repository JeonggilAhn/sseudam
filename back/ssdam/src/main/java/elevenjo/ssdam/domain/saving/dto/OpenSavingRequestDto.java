package elevenjo.ssdam.domain.saving.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class OpenSavingRequestDto {
    private String depositBalance;
    private String withdrawalAccountNo;
}
