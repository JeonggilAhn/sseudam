package elevenjo.ssdam.domain.saving.dto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import elevenjo.ssdam.domain.saving.entity.Saving;

import java.util.List;

public record ProductDto(
        BaseInfo baseinfo,
        List<OptionDto> options
) {
    public Saving toEntity(String hompUrl) {
        int minRate = options.stream()
                .mapToInt(o -> (int)(o.intrRate() * 100))
                .min().orElse(0);

        int maxRate = options.stream()
                .mapToInt(o -> (int)(o.intrRate2() * 100))
                .max().orElse(0);

        return Saving.builder()
                .finCoNo(baseinfo.finCoNo())
                .finCoNm(baseinfo.korCoNm())
                .hompUrl(hompUrl)
                .finPrdtCd(baseinfo.finPrdtCd())
                .finPrdtNm(baseinfo.finPrdtNm())
                .mtrtInt(baseinfo.mtrtInt())
                .spclCnd(baseinfo.spclCnd())
                .joinDeny(Integer.parseInt(baseinfo.joinDeny()))
                .joinMember(baseinfo.joinMember())
                .etcNote(baseinfo.etcNote())
                .maxLimit(parseLimit(baseinfo.maxLimit()))
                .minIntRate(minRate)
                .maxIntRate(maxRate)
                .views(0)
                .build();
    }

    private int parseLimit(String maxLimit) {
        try {
            return Integer.parseInt(maxLimit);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public String getFinCoNo() {
        return baseinfo.finCoNo();
    }

    @JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
    public record BaseInfo(
            String finCoNo,
            String korCoNm,
            String finPrdtCd,
            String finPrdtNm,
            String mtrtInt,
            String spclCnd,
            String joinDeny,
            String joinMember,
            String etcNote,
            String maxLimit
    ) {}

    public String getUniqueKey() {
        return baseinfo.finCoNo() + "_" + baseinfo.finPrdtCd();
    }


}
