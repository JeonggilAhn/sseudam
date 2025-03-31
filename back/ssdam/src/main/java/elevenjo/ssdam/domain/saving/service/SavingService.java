package elevenjo.ssdam.domain.saving.service;

import elevenjo.ssdam.domain.saving.dto.OpenSavingApiResponse;
import elevenjo.ssdam.domain.saving.dto.OpenSavingRequestDto;
import elevenjo.ssdam.domain.saving.dto.OpenSavingResponseDto;
import elevenjo.ssdam.domain.saving.dto.ProductDto;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.exception.SavingNotFoundException;
import elevenjo.ssdam.domain.saving.repository.SavingRepository;
import elevenjo.ssdam.global.externalApi.ExternalApiUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SavingService {

    private final SavingRepository savingRepository;
    private final FssSavingSyncService syncService;
    private final ExternalApiUtil externalApiUtil;

    // 검색 + 정렬 분기 처리
    @Transactional(readOnly = true)
    public Page<Saving> getAllSavings(String keyword, String sort, Pageable pageable) {
        boolean hasKeyword = keyword != null && !keyword.isBlank();

        if (hasKeyword) {
            String keywordNoSpace = keyword.replace(" ", "");
            Pageable noSortPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
            return savingRepository.searchByKeyword(keywordNoSpace, noSortPageable);
        }

        // 정렬 파라미터 없는 경우 (기본: id 순)
        if (sort == null || sort.isBlank()) {
            return savingRepository.findAll(pageable);
        }

        // 정렬 조건에 따른 분기
        if (sort.equals("views")) {
            return savingRepository.findAllByOrderByViewsDesc(pageable);
        } else if (sort.equals("maxIntRate")) {
            return savingRepository.findAllByOrderByMaxIntRateDesc(pageable);
        } else if (sort.equals("likes")) {
            Pageable noSortPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
            return savingRepository.findAllOrderByLikes(noSortPageable);
        }

        // 예외 처리: 정렬 값이 이상할 경우 기본
        return savingRepository.findAll(pageable);
    }


    @Transactional
    public Saving getSavingDetail(Long savingId) {
        Saving saving = getSavingById(savingId);
        saving.increaseViews();
        return savingRepository.save(saving);
    }

    @Transactional(readOnly = true)
    public Saving getSavingForOpen(Long savingId) {
        return getSavingById(savingId);
    }

    @Transactional
    public OpenSavingResponseDto openSaving(Long savingId, OpenSavingRequestDto requestDto, String userKey) {
        Saving saving = getSavingById(savingId);
        String accountTypeUniqueNo = saving.getFinPrdtCd();

        Map<String, Object> body = new HashMap<>();
        body.put("accountTypeUniqueNo", accountTypeUniqueNo);
        body.put("depositBalance", requestDto.getDepositBalance());
        body.put("withdrawalAccountNo", requestDto.getWithdrawalAccountNo());

        return externalApiUtil.postWithHeader(
                "https://finopenapi.ssafy.io/ssafy/api/v1/edu/savings/createAccount",
                "createAccount",
                userKey,
                body,
                OpenSavingApiResponse.class
        ).getRec();
    }

    public void syncSavingsFromOpenApi() {
        syncService.syncSavingsFromOpenApi();
    }

    public void registerSavingsFromApi(List<ProductDto> productDtos, Map<String, String> finCoUrlMap) {
        List<Saving> savings = productDtos.stream()
                .map(dto -> dto.toEntity(finCoUrlMap.getOrDefault(dto.getFinCoNo(), null)))
                .toList();
        savingRepository.saveAll(savings);
    }

    private Saving getSavingById(Long savingId) {
        return savingRepository.findById(savingId)
                .orElseThrow(SavingNotFoundException::new);
    }
}