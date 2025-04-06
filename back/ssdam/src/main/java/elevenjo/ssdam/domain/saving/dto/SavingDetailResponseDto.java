package elevenjo.ssdam.domain.saving.dto;

public record SavingDetailResponseDto(
        Long savingId,
        String finPrdtCd,
        String finCoNm,
        String finPrdtNm,
        String mtrtInt,
        String spclCnd,
        String etcNote,
        Integer maxLimit,
        Integer minIntRate,
        Integer maxIntRate,
        String hompUrl,
        Integer views,
        Long likeCount,
        Boolean liked
) {}
