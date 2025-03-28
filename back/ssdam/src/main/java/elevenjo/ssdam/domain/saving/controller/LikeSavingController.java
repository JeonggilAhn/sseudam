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
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/savings-products/{savingId}/likes")
public class LikeSavingController {

    private final LikeSavingService likeSavingService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ResponseWrapper<LikeSavingResponseDto>> toggleLike(
            @PathVariable Long savingId,
            @RequestBody UserIdRequestDto userIdDto
    ) {
        System.out.println("🪵 userIdDto: " + userIdDto); // <- 여기에 찍히는지 봐봐
        System.out.println("🪵 userId: " + userIdDto.getUserId()); // <- null이면 요청 문제


        User user = userRepository.findById(userIdDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException());


        boolean liked = likeSavingService.toggleLike(user, savingId);
        Long likeCount = likeSavingService.countLikes(savingId);

        LikeSavingResponseDto response = new LikeSavingResponseDto(likeCount, liked);
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, response);
    }

    @GetMapping
    public ResponseEntity<ResponseWrapper<LikeSavingResponseDto>> getLikeInfo(
            @PathVariable Long savingId,
            @RequestBody UserIdRequestDto userIdDto
    ) {
        User user = userRepository.findById(userIdDto.getUserId())
                .orElseThrow(UserNotFoundException::new);

        Long likeCount = likeSavingService.countLikes(savingId);
        boolean liked = likeSavingService.isLikedByUser(user, savingId);

        LikeSavingResponseDto response = new LikeSavingResponseDto(likeCount, liked);
        return ResponseWrapperFactory.setResponse(DefaultResponseCode.OK, null, response);
    }


}
