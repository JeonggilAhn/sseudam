package elevenjo.ssdam.domain.saving.controller;

import elevenjo.ssdam.domain.saving.dto.LikeSavingResponseDto;
import elevenjo.ssdam.domain.saving.service.LikeSavingService;
import elevenjo.ssdam.domain.user.dto.UserIdRequestDto;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.exception.UserNotFoundException;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import elevenjo.ssdam.global.response.DefaultResponseCode;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
public class LikeSavingController {

    private final LikeSavingService likeSavingService;

    // 기존 좋아요 토글 & 단건 조회
    @PostMapping("/savings-products/{savingId}/likes")
    public ResponseEntity<ResponseWrapper<LikeSavingResponseDto>> toggleLike(
            @PathVariable Long savingId,
            @AuthenticationPrincipal User user
    ) {
        boolean liked = likeSavingService.toggleLike(user, savingId);
        Long likeCount = likeSavingService.countLikes(savingId);
        LikeSavingResponseDto response = new LikeSavingResponseDto(likeCount, liked);
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, response);
    }

    @GetMapping("/savings-products/{savingId}/likes")
    public ResponseEntity<ResponseWrapper<LikeSavingResponseDto>> getLikeInfo(
            @PathVariable Long savingId,
            @AuthenticationPrincipal User user
    ) {
        Long likeCount = likeSavingService.countLikes(savingId);
        boolean liked = likeSavingService.isLikedByUser(user, savingId);
        LikeSavingResponseDto response = new LikeSavingResponseDto(likeCount, liked);
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, response);
    }

    // 유저 좋아요 전체 목록
    @GetMapping("/savings-products/likes/me")
    public ResponseEntity<ResponseWrapper<List<Long>>> getMyLikedSavings(
            @AuthenticationPrincipal User user
    ) {
        List<Long> likedSavingIds = likeSavingService.getLikedSavingIdsByUser(user);
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, likedSavingIds);
    }
}
