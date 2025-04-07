package elevenjo.ssdam.domain.saving.controller;

import elevenjo.ssdam.domain.saving.dto.OpenSavingRequestDto;
import elevenjo.ssdam.domain.saving.dto.OpenSavingResponseDto;
import elevenjo.ssdam.domain.saving.dto.SavingCardResponseDto;
import elevenjo.ssdam.domain.saving.dto.SavingDetailResponseDto;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.service.FssSavingSyncService;
import elevenjo.ssdam.domain.saving.service.LikeSavingService;
import elevenjo.ssdam.domain.saving.service.SavingService;
import elevenjo.ssdam.domain.user.dto.CustomOAuth2User;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.response.DefaultResponseCode;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/savings-products")
public class SavingController {

    private final SavingService savingService;
    private final LikeSavingService likeSavingService;
    private final FssSavingSyncService syncService;

    // 1. 적금 목록 조회 (정렬 + 검색)
    @GetMapping
    public ResponseEntity<ResponseWrapper<Page<SavingCardResponseDto>>> getAllSavings(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sort,
            Pageable pageable
    ) {
        // 서비스에서 keyword가 있으면 유사도 검색, 아니면 정렬 처리
        Page<Saving> page = savingService.getAllSavings(keyword, sort, pageable);

        // likeCount와 함께 DTO 매핑
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
                    false // 로그인 시 liked 처리
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

    // 3. 외부 API 적금 동기화
    @PostMapping("/sync")
    public ResponseEntity<ResponseWrapper<Void>> syncSavings() {
        syncService.syncSavingsFromOpenApi();
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, new HttpHeaders(), null);
    }

    // 4. 적금 가입
    @PostMapping("/{savingId}")
    public ResponseEntity<ResponseWrapper<OpenSavingResponseDto>> openSaving(
            @PathVariable Long savingId,
            @AuthenticationPrincipal User user,
            @RequestBody OpenSavingRequestDto requestDto
    ) {
        OpenSavingResponseDto response = savingService.openSaving(savingId, requestDto, user);
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, response);
    }


}
