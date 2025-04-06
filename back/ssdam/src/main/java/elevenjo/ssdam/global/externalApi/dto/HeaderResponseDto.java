package elevenjo.ssdam.global.externalApi.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public record HeaderResponseDto (
        String responseCode,
        String responseMessage,
        String apiName,
        String transmissionDate,
        String transmissionTime,
        String institutionCode,
        String apiKey,
        String apiServiceCode,
        String institutionTransactionUniqueNo
) {
}
