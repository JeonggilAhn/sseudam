package elevenjo.ssdam.global.ssafyApi.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public record HeaderRequestDto (
        String apiName,
        String transmissionDate,
        String transmissionTime,
        String institutionCode,
        String fintechAppNo,
        String apiServiceCode,
        String institutionTransactionUniqueNo,
        String apiKey,
        String userKey
) {
    public static HeaderRequestDto from(String apiName, String userKey, String apiKey) {
        LocalDateTime now = LocalDateTime.now();
        String transmissionDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String transmissionTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));

        Random random = new Random();
        int randomNum = random.nextInt(1_000_000);
        String random6 = String.format("%06d", randomNum);

        String institutionTransactionUniqueNo = transmissionDate + transmissionTime + random6;

        return new HeaderRequestDto(
                apiName,
                transmissionDate,
                transmissionTime,
                "00100",
                "001",
                apiName,
                institutionTransactionUniqueNo,
                apiKey,
                userKey
        );
    }
}
