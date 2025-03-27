package elevenjo.ssdam.domain.saving.external;

import elevenjo.ssdam.domain.saving.config.FssApiProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class FssOpenApiClient {

    private final FssApiProperties fssApiProperties;
    private final FssXmlParser parser;

    // 1. 적금 상품 목록 요청
    public String getSavingProductsXml() {
        String apiKey = fssApiProperties.getValue();
        log.info("✅ 가져온 API KEY: {}", apiKey);

        if (apiKey == null || apiKey.isBlank()) {
            log.warn("❌ API KEY가 설정되지 않았습니다.");
            return null;
        }

        String uri = UriComponentsBuilder
                .fromHttpUrl("https://finlife.fss.or.kr/finlifeapi/savingProductsSearch.xml")
                .queryParam("auth", apiKey)
                .queryParam("topFinGrpNo", "020000")
                .queryParam("pageNo", 1)
                .toUriString();

        log.info("🔗 요청 URI: {}", uri);

        try {
            return new RestTemplate().getForObject(uri, String.class);
        } catch (Exception e) {
            log.error("❌ 외부 API 호출 실패: {}", e.getMessage(), e);
            return null;
        }
    }

    // 2. 금융사 목록 XML 요청
    public String getCompanySearchXml() {
        String apiKey = fssApiProperties.getValue();

        if (apiKey == null || apiKey.isBlank()) {
            log.warn("❌ API KEY가 설정되지 않았습니다.");
            return null;
        }

        String uri = UriComponentsBuilder
                .fromHttpUrl("https://finlife.fss.or.kr/finlifeapi/companySearch.xml")
                .queryParam("auth", apiKey)
                .queryParam("topFinGrpNo", "020000") // 은행권
                .queryParam("pageNo", 1)             // 필수
                .queryParam("format", "xml")         // 필수
                .queryParam("svcId", "companySearch") // 필수
                .toUriString();

        log.info("🔗 금융사 목록 요청 URI: {}", uri);

        try {
            return new RestTemplate().getForObject(uri, String.class);
        } catch (Exception e) {
            log.error("❌ 금융사 목록 API 호출 실패: {}", e.getMessage(), e);
            return null;
        }
    }

    // 3. 금융사 코드 → 홈페이지 URL 매핑
    public Map<String, String> getCompanyUrlMap() {
        String xml = getCompanySearchXml();
        if (xml == null) {
            throw new IllegalStateException("금융사 목록을 불러오지 못했습니다.");
        }
        return parser.parseCompanyUrls(xml);
    }
}
