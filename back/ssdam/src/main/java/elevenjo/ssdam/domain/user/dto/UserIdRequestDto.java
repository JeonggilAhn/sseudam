package elevenjo.ssdam.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserIdRequestDto {

    private Long userId;

    public UserIdRequestDto() {}

    @JsonCreator
    public UserIdRequestDto(@JsonProperty("userId") Long userId) {
        this.userId = userId;
    }
}
