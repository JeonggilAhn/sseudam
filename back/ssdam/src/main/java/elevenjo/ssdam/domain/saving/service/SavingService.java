package elevenjo.ssdam.domain.saving.service;

import elevenjo.ssdam.domain.saving.dto.ProductDto;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.exception.SavingNotFoundException;
import elevenjo.ssdam.domain.saving.repository.SavingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavingService {

    private final SavingRepository savingRepository;
    private final FssSavingSyncService syncService; // 추가

    public void syncSavingsFromOpenApi() {
        syncService.syncSavingsFromOpenApi();
    }

    // 적금 전체 조회 (검색 + 정렬 + 페이징)
    @Transactional(readOnly = true)
    public Page<Saving> getAllSavings(String keyword, String sort, Pageable pageable) {
        if (keyword != null && !keyword.isBlank()) {
            return savingRepository.findByFinPrdtNmContainingIgnoreCase(keyword, pageable);
        }

        return switch (sort) {
            case "views" -> savingRepository.findAllByOrderByViewsDesc(pageable);
            case "interest" -> savingRepository.findAllByOrderByMaxIntRateDesc(pageable);
            case "likes" -> savingRepository.findAllOrderByLikes(pageable);
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
