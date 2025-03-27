package elevenjo.ssdam.domain.ssafyApi.dto;

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
    public static HeaderRequestDto from(String apiName, String userKey) {
        LocalDateTime now = LocalDateTime.now();
        String transmissionDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String transmissionTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));
        Random random = new Random();
        int randomNum = random.nextInt(1_000_000);
        String random6 = String.format("%06d", randomNum);
        StringBuilder sb = new StringBuilder();
        String institutionTransactionUniqueNo = sb
            .append(transmissionDate)
            .append(transmissionTime)
            .append(random6)
            .toString();

        return new HeaderRequestDto(
            apiName,
            transmissionDate,
            transmissionTime,
            "00100",
            "001",
            apiName,
            institutionTransactionUniqueNo,
            "96a1bf6595d94544821231c5c234fd6e",
            userKey
        );
    }
}
