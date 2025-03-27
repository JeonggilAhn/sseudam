package elevenjo.ssdam.global.externalApi;

import elevenjo.ssdam.global.externalApi.dto.ApiRequest;
import elevenjo.ssdam.global.externalApi.dto.HeaderRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class ExternalApiUtil {
    private final RestTemplate restTemplate;

    @Value("${ssafy-api-key}")
    private String ssafyApiKey;

    @Autowired
    public ExternalApiUtil(
            RestTemplate restTemplate
    ) {
        this.restTemplate = restTemplate;
    }

    public <T> T post(String uri, Object body, Class<T> responseType) {
        return restTemplate.postForObject(uri, body, responseType);
    }

    public <T> T postWithBodyApiKey(String uri, Map<String, Object> body, Class<T> responseType) {
        body.put("apiKey", ssafyApiKey);
        return restTemplate.postForObject(uri, body, responseType);
    }


    public <R> R postWithHeader(
            String uri,
            String apiName,
            String userKey,
            Map<String, Object> body,
            Class<R> responseType
    ) {
        HeaderRequestDto header = HeaderRequestDto.from(apiName, userKey, ssafyApiKey);
        ApiRequest request = new ApiRequest(header);

        if(body != null) {
            body.forEach(request::addField);
        }

        return restTemplate.postForObject(uri, request, responseType);
    }
}
