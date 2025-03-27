package elevenjo.ssdam.domain.user.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;

public record UpdateUserRequestDto(
        @NotBlank String withdrawAccountNo,
        @NonNull @Min(value = 1) @Max(value = 100)
        Integer savingRate
        ) {
}
