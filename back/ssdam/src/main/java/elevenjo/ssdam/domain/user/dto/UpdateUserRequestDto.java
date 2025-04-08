package elevenjo.ssdam.domain.user.dto;

public record UpdateUserRequestDto(
        String withdrawAccountNo,
        Integer savingRate
        ) {
}
