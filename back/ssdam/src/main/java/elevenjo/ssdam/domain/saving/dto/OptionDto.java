package elevenjo.ssdam.domain.saving.dto;

public record OptionDto(
        String intrRateType,
        String intrRateTypeNm,
        String rsrvType,
        String rsrvTypeNm,
        Integer saveTrm,
        Double intrRate,
        Double intrRate2
) {}
