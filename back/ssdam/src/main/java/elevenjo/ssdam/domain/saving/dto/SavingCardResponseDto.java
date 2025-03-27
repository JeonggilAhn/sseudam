package elevenjo.ssdam.domain.saving.dto;

public record SavingCardResponseDto(
        Long savingId,
        String finCoNm,
        String finPrdtNm,
        Integer minIntRate,
        Integer maxIntRate,
        Integer views,
        Long likeCount,
        Boolean liked
) {}
