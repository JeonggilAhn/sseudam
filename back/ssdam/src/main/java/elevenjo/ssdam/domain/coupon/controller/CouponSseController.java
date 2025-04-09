package elevenjo.ssdam.domain.coupon.controller;

import elevenjo.ssdam.global.sse.SseService;
import elevenjo.ssdam.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
public class CouponSseController {

    private final SseService sseService;
    @GetMapping("/subscribe")
    public SseEmitter subscribe(
            @AuthenticationPrincipal User user){
        return sseService.subscribe(user.getUserId());
    }
}
