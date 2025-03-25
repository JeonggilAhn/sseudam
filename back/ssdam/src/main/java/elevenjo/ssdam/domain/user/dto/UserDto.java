package elevenjo.ssdam.domain.user.dto;

import java.time.LocalDateTime;

public record UserDto(
	Long userId,
	String userEmail,
	String profileUrl,
	LocalDateTime signupDate,
	Boolean isUnauthorizedUser
) {
}
