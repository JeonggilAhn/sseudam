package elevenjo.ssdam.domain.user.dto.external;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public record SSAFYUserResponseDto(
        String userId,
        String userName,
        String institutionCode,
        String userKey,
        String created,
        String modified
) {
}
