package elevenjo.ssdam.global.ssafyApi;

import elevenjo.ssdam.global.ssafyApi.dto.ApiRequest;
import elevenjo.ssdam.global.ssafyApi.dto.HeaderRequestDto;
import elevenjo.ssdam.global.ssafyApi.dto.HeaderRequestDtoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class SsafyApiUtil {
    private final HeaderRequestDtoFactory headerRequestDtoFactory;
    private final RestTemplate restTemplate;

    @Autowired
    public SsafyApiUtil(
            HeaderRequestDtoFactory headerRequestDtoFactory,
            RestTemplate restTemplate
    ) {
        this.headerRequestDtoFactory = headerRequestDtoFactory;
        this.restTemplate = restTemplate;
    }

    public <T> T post(String uri, Object body, Class<T> responseType) {
        return restTemplate.postForObject(uri, body, responseType);
    }

    public <R> R postWithHeader(
            String uri,
            String apiName,
            String userKey,
            Map<String, Object> body,
            Class<R> responseType
    ) {
        HeaderRequestDto header = headerRequestDtoFactory.create(apiName, userKey);
        ApiRequest request = new ApiRequest(header);

        if(body != null) {
            body.forEach(request::addField);
        }

        return restTemplate.postForObject(uri, request, responseType);
    }
}
