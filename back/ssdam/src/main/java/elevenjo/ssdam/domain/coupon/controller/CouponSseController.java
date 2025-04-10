package elevenjo.ssdam.domain.coupon.controller;

import elevenjo.ssdam.global.sse.SseService;
import elevenjo.ssdam.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
public class CouponSseController {

    private final SseService sseService;
    @GetMapping("/subscribe/{couponId}")
    public SseEmitter subscribe(
            @AuthenticationPrincipal User user,
            @PathVariable Long couponId) {
        if(couponId == null) {
            throw new RuntimeException("couponId is null");
        }
        return sseService.subscribe(user.getUserId(), couponId);
    }
}
