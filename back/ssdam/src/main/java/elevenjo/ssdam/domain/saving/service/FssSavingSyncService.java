package elevenjo.ssdam.domain.saving.service;

import elevenjo.ssdam.domain.saving.dto.ProductDto;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.external.FssOpenApiClient;
import elevenjo.ssdam.domain.saving.external.FssXmlParser;
import elevenjo.ssdam.domain.saving.repository.SavingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FssSavingSyncService {

    private final FssOpenApiClient openApiClient;
    private final FssXmlParser parser;
    private final SavingRepository savingRepository;

    @Transactional
    public void syncSavingsFromOpenApi() {
        // 1. API 요청 및 XML 응답
        List<String> xmlList = openApiClient.getSavingProductsXmlList();
        if (xmlList == null || xmlList.isEmpty()) {
            throw new IllegalStateException("외부 API로부터 데이터를 가져오지 못했습니다.");
        }

        // 2. 여러 XML → ProductDto 변환
        List<ProductDto> productDtos = new ArrayList<>();
        for (String xml : xmlList) {
            productDtos.addAll(parser.parseSavingProducts(xml));
        }
        log.info("✅ 파싱된 상품 수: {}", productDtos.size());

        // 3. homp_url 매핑 정보 받아오기
        Map<String, String> companyUrlMap = openApiClient.getCompanyUrlMap();

        // 4. ProductDto → Saving 엔티티 변환
        List<Saving> externalList = productDtos.stream()
                .map(dto -> dto.toEntity(companyUrlMap.get(dto.getFinCoNo())))
                .toList();

        // 5. 기존 DB 데이터 조회
        List<Saving> existingList = savingRepository.findAll();

        // 6. 고유키 기준 비교
        Set<String> existingKeys = existingList.stream()
                .map(s -> s.getFinCoNo() + "_" + s.getFinPrdtCd())
                .collect(Collectors.toSet());

        Set<String> newKeys = externalList.stream()
                .map(s -> s.getFinCoNo() + "_" + s.getFinPrdtCd())
                .collect(Collectors.toSet());

        // 7. 추가 대상
        List<Saving> toAdd = externalList.stream()
                .filter(s -> !existingKeys.contains(s.getFinCoNo() + "_" + s.getFinPrdtCd()))
                .toList();

        // 8. 삭제 대상
        List<Saving> toDelete = existingList.stream()
                .filter(s -> !newKeys.contains(s.getFinCoNo() + "_" + s.getFinPrdtCd()))
                .toList();

        // 9. DB 반영
        savingRepository.saveAll(toAdd);
        savingRepository.deleteAll(toDelete);

        log.info("✅ 동기화 완료 - 추가: {}, 삭제: {}, 유지: {}",
                toAdd.size(), toDelete.size(), productDtos.size() - toAdd.size());
    }


    @Scheduled(cron = "0 0 0 * * ?") // 매일 새벽 3시에 실행
    @Transactional
    public void syncDaily() {
        log.info("🕒 [자동] 적금 동기화 작업 시작");
        syncSavingsFromOpenApi(); // 기존 메서드 재사용
    }

}
