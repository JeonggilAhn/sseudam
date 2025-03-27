package elevenjo.ssdam.global.ssafyApi.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class HeaderRequestDtoFactory {

    @Value("${ssafy-api-key}")
    private String apiKey;

    public HeaderRequestDto create(String apiName, String userKey) {
        return HeaderRequestDto.from(apiName, userKey, apiKey);
    }
}
