package elevenjo.ssdam.domain.saving.service;

import elevenjo.ssdam.domain.saving.dto.*;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.exception.SavingNotFoundException;
import elevenjo.ssdam.domain.saving.repository.SavingRepository;
import elevenjo.ssdam.domain.saving.util.SimilaritySearchUtil;
import elevenjo.ssdam.global.externalApi.ExternalApiUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SavingService {

    private final SavingRepository savingRepository;
    private final FssSavingSyncService syncService;
    private final ExternalApiUtil externalApiUtil;
    private final SimilaritySearchUtil similaritySearchUtil;


    @Transactional(readOnly = true)
    public Page<Saving> getAllSavings(String keyword, String sort, Pageable pageable) {
        boolean hasKeyword = keyword != null && !keyword.isBlank();

        if (hasKeyword) {
            List<Saving> matched = similaritySearchUtil.searchWithKeyword(keyword, savingRepository.findAll());
            int start = (int) pageable.getOffset();
            int end = Math.min(start + pageable.getPageSize(), matched.size());
            List<Saving> paged = matched.subList(start, end);
            return new PageImpl<>(paged, pageable, matched.size());
        }

        if (sort == null || sort.isBlank()) return savingRepository.findAll(pageable);
        return switch (sort) {
            case "views" -> savingRepository.findAllByOrderByViewsDesc(pageable);
            case "maxIntRate" -> savingRepository.findAllByOrderByMaxIntRateDesc(pageable);
            case "likes" -> savingRepository.findAllOrderByLikes(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()));
            default -> savingRepository.findAll(pageable);
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
        Map<String, Object> body = Map.of(
                "accountTypeUniqueNo", saving.getFinPrdtCd(),
                "depositBalance", requestDto.getDepositBalance(),
                "withdrawalAccountNo", requestDto.getWithdrawalAccountNo()
        );
        return externalApiUtil.postWithHeader(
                "https://finopenapi.ssafy.io/ssafy/api/v1/edu/savings/createAccount",
                "createAccount", userKey, body, OpenSavingApiResponse.class
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
        return savingRepository.findById(savingId).orElseThrow(SavingNotFoundException::new);
    }
}
