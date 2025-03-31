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

        return switch (sort) {
            case "maxIntRate" -> savingRepository.findAllByOrderByMaxIntRateDesc(pageable);
            case "likes" -> {
                Pageable noSortPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
                yield savingRepository.findAllOrderByLikes(noSortPageable);
            }
            default -> savingRepository.findAllByOrderByViewsDesc(pageable);
        };
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
