package elevenjo.ssdam.global.externalApi.dto;

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
