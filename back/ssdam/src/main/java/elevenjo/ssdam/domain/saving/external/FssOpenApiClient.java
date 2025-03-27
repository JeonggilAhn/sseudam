package elevenjo.ssdam.domain.saving.external;

import elevenjo.ssdam.domain.saving.config.FssApiProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class FssOpenApiClient {

    private final FssApiProperties fssApiProperties;
    private final FssXmlParser parser;

    private final List<String> topFinGrpNos = List.of("020000", "030300"); // 은행권 + 상호금융권

    // 1. 적금 상품 목록 XML 여러 그룹에 대해 요청
    public List<String> getSavingProductsXmlList() {
        String apiKey = fssApiProperties.getValue();
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("❌ API KEY가 설정되지 않았습니다.");
            return List.of();
        }

        List<String> xmlList = new ArrayList<>();

        for (String topFinGrpNo : topFinGrpNos) {
            String uri = UriComponentsBuilder
                    .fromHttpUrl("https://finlife.fss.or.kr/finlifeapi/savingProductsSearch.xml")
                    .queryParam("auth", apiKey)
                    .queryParam("topFinGrpNo", topFinGrpNo)
                    .queryParam("pageNo", 1)
                    .toUriString();

            log.info("🔗 적금 URI ({}): {}", topFinGrpNo, uri);

            try {
                String xml = new RestTemplate().getForObject(uri, String.class);
                if (xml != null) {
                    xmlList.add(xml);
                }
            } catch (Exception e) {
                log.error("❌ 적금 API 호출 실패 ({}): {}", topFinGrpNo, e.getMessage(), e);
            }
        }

        return xmlList;
    }

    // 2. 금융사 목록 XML 여러 그룹에 대해 요청
    public List<String> getCompanySearchXmlList() {
        String apiKey = fssApiProperties.getValue();
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("❌ API KEY가 설정되지 않았습니다.");
            return List.of();
        }

        List<String> xmlList = new ArrayList<>();

        for (String topFinGrpNo : topFinGrpNos) {
            String uri = UriComponentsBuilder
                    .fromHttpUrl("https://finlife.fss.or.kr/finlifeapi/companySearch.xml")
                    .queryParam("auth", apiKey)
                    .queryParam("topFinGrpNo", topFinGrpNo)
                    .queryParam("pageNo", 1)
                    .queryParam("format", "xml")
                    .queryParam("svcId", "companySearch")
                    .toUriString();

            log.info("🔗 금융사 URI ({}): {}", topFinGrpNo, uri);

            try {
                String xml = new RestTemplate().getForObject(uri, String.class);
                if (xml != null) {
                    xmlList.add(xml);
                }
            } catch (Exception e) {
                log.error("❌ 금융사 API 호출 실패 ({}): {}", topFinGrpNo, e.getMessage(), e);
            }
        }

        return xmlList;
    }

    // 3. 금융사 코드 → 홈페이지 URL 매핑 (합쳐서 처리)
    public Map<String, String> getCompanyUrlMap() {
        List<String> xmlList = getCompanySearchXmlList();
        if (xmlList.isEmpty()) {
            throw new IllegalStateException("금융사 목록을 불러오지 못했습니다.");
        }

        Map<String, String> totalMap = new HashMap<>();
        for (String xml : xmlList) {
            Map<String, String> partial = parser.parseCompanyUrls(xml);
            totalMap.putAll(partial); // 병합
        }

        return totalMap;
    }
}
