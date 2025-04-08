package elevenjo.ssdam.domain.user.dto;

public record RegisterUserInfoRequestDto(
        String userName,
        String birthday,
        String withdrawAccountNo,
        Integer savingRate) {
}
