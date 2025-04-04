package elevenjo.ssdam.domain.user.dto;

import elevenjo.ssdam.domain.user.entity.User;

import java.time.LocalDateTime;

public record UserDto(
	String userEmail,
	String userName,
	LocalDateTime userBirthday,
	String piggyAccountNo,
	Integer savingRate,
	String withdrawAccountNo,
	LocalDateTime signupDate
) {
	public static UserDto from(User user) {
		return new UserDto(
			user.getUserEmail(),
			user.getUserName(),
			user.getBirthday(),
			user.getPiggyAccountNo(),
			user.getSavingRate(),
			user.getWithdrawAccountNo(),
			user.getCreatedAt()
		);
	}
}
