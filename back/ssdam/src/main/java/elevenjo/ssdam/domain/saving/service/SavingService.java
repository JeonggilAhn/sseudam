package elevenjo.ssdam.domain.saving.service;

import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.exception.SavingNotFoundException;
import elevenjo.ssdam.domain.saving.repository.SavingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingService {

    private final SavingRepository savingRepository;

    //적금 상품 전체 조회 (검색 + 정렬 + 페이징)
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

    //적금 상세 조회 + 조회수 증가
    @Transactional
    public Saving getSavingDetail(Long savingId) {
        Saving saving = getSavingById(savingId);
        saving.increaseViews();
        return savingRepository.save(saving);
    }

    // 적금 개설용 상품 조회
    @Transactional(readOnly = true)
    public Saving getSavingForOpen(Long savingId) {
        return getSavingById(savingId);
    }

    //적금 상품 단건 등록
    @Transactional
    public Saving registerSaving(Saving saving) {
        return savingRepository.save(saving);
    }

    // 적금 상품 다건 등록 (saveAll) - 크롤링 전체 저장용
    @Transactional
    public List<Saving> registerSavings(List<Saving> savings) {
        return savingRepository.saveAll(savings);
    }

    // 내부 공통 메서드 - 적금 상품 ID로 단건 조회
    private Saving getSavingById(Long savingId) {
        return savingRepository.findById(savingId)
                .orElseThrow(SavingNotFoundException::new);
    }
}
