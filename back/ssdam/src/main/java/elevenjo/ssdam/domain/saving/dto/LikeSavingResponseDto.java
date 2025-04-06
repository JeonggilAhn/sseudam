package elevenjo.ssdam.domain.saving.dto;

public record LikeSavingResponseDto(
        Long likeCount,
        Boolean liked
) {}

