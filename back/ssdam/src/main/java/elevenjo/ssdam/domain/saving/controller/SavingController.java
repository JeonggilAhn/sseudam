package elevenjo.ssdam.domain.saving.controller;

import elevenjo.ssdam.domain.saving.dto.OpenSavingRequestDto;
import elevenjo.ssdam.domain.saving.dto.OpenSavingResponseDto;
import elevenjo.ssdam.domain.saving.dto.SavingCardResponseDto;
import elevenjo.ssdam.domain.saving.dto.SavingDetailResponseDto;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.service.FssSavingSyncService;
import elevenjo.ssdam.domain.saving.service.LikeSavingService;
import elevenjo.ssdam.domain.saving.service.SavingService;
import elevenjo.ssdam.global.response.DefaultResponseCode;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/savings-products")
public class SavingController {

    private final SavingService savingService;
    private final LikeSavingService likeSavingService;
    private final FssSavingSyncService syncService;

    // 1. 적금 목록 조회 (검색 + 정렬 + 페이징)
    @GetMapping
    public ResponseEntity<ResponseWrapper<Page<SavingCardResponseDto>>> getAllSavings(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "views") String sort,
            Pageable pageable
    ) {
        Page<Saving> page = savingService.getAllSavings(keyword, sort, pageable);

        Page<SavingCardResponseDto> response = page.map(saving -> {
            Long likeCount = likeSavingService.countLikes(saving.getSavingId());
            return new SavingCardResponseDto(
                    saving.getSavingId(),
                    saving.getFinCoNm(),
                    saving.getFinPrdtNm(),
                    saving.getMinIntRate(),
                    saving.getMaxIntRate(),
                    saving.getViews(),
                    likeCount,
                    false // 로그인 붙이면 수정
            );
        });

        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, response);
    }


    // 2. 적금 상세 조회
    @GetMapping("/{savingId}")
    public ResponseEntity<ResponseWrapper<SavingDetailResponseDto>> getSavingDetail(@PathVariable Long savingId) {
        Saving saving = savingService.getSavingDetail(savingId);
        Long likeCount = likeSavingService.countLikes(savingId);

        SavingDetailResponseDto response = new SavingDetailResponseDto(
                saving.getSavingId(),
                saving.getFinCoNm(),
                saving.getFinPrdtCd(),
                saving.getFinPrdtNm(),
                saving.getMtrtInt(),
                saving.getSpclCnd(),
                saving.getEtcNote(),
                saving.getMaxLimit(),
                saving.getMinIntRate(),
                saving.getMaxIntRate(),
                saving.getHompUrl(),
                saving.getViews(),
                likeCount,
                false
        );

        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, response);
    }

    // 3. 외부 API 기반 적금 데이터 동기화
    @PostMapping("/sync")
    public ResponseEntity<ResponseWrapper<Void>> syncSavings() {
        syncService.syncSavingsFromOpenApi();
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, new HttpHeaders(), null);
    }

    // 4. 적금 개설
    @PostMapping("/{savingId}")
    public ResponseEntity<ResponseWrapper<OpenSavingResponseDto>> openSaving(
            @PathVariable Long savingId,
            @RequestBody OpenSavingRequestDto requestDto
    ) {
        // DEBUG: DTO 값이 잘 들어오는지 로그 찍기
        System.out.println("✅ Controller 받은 값:");
        System.out.println("depositBalance: " + requestDto.getDepositBalance());
        System.out.println("withdrawalAccountNo: " + requestDto.getWithdrawalAccountNo());

        String userKey = "5d5b80b7-103b-419f-90f4-3eace59c22d1";
        OpenSavingResponseDto response = savingService.openSaving(savingId, requestDto, userKey);
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, response);
    }


}
