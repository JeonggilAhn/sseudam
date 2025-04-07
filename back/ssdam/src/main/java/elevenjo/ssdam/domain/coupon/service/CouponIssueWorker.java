package elevenjo.ssdam.domain.coupon.service;

import elevenjo.ssdam.domain.coupon.dto.response.CouponResultResponse;
import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.coupon.entity.CouponType;
import elevenjo.ssdam.domain.coupon.repository.CouponIssuedRepository;
import elevenjo.ssdam.domain.coupon.repository.CouponRepository;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class CouponIssueWorker {

    private final CouponRepository couponRepository;
    private final CouponIssuedRepository couponIssuedRepository;
    private final CouponQueueService queueService;
    private final RedisTemplate<String, String> redisTemplate;
    private final UserRepository userRepository;
    private final SseService sseService;

    // TODO: 나중에 시간과 배치 사이즈 조정
    @Scheduled(fixedDelay = 60000)
    public void processQueue() {
        List<Coupon> coupons = couponRepository.findAllByCouponType(CouponType.POPULAR_LIMITED);

        for (Coupon coupon : coupons) {
            List<String> userIds = queueService.pollNextUsers(coupon.getCouponId(), 10);

            if (userIds.isEmpty()) {
                continue;
            }

            for (String nextUserId : userIds) {
                processSingleUser(coupon, nextUserId);
            }
        }
    }

    private void processSingleUser(Coupon coupon, String userIdStr) {
        Long couponId = coupon.getCouponId();
        String redisKey = "coupon:list:" + couponId;
        Long userIdLong = Long.parseLong(userIdStr);

        try {
            Object popped = redisTemplate.opsForList().rightPop(redisKey);
            if (popped == null) {
                // 재고 없음 실패 메시지 전송
                sseService.sendCouponResult(userIdLong,
                        new CouponResultResponse(false, "쿠폰이 모두 소진되었습니다."));
                return;
            }

            couponIssuedRepository.insertCouponIssued(userIdLong, coupon);

            // 발급 성공 메시지 전송
            sseService.sendCouponResult(userIdLong,
                    new CouponResultResponse(true, "쿠폰 발급 완료!"));
        } catch (Exception e) {
            // 그 외 예외 발생 시 실패 메시지 전송
            sseService.sendCouponResult(userIdLong,
                    new CouponResultResponse(false, "쿠폰 발급에 실패했습니다."));
            log.info(e.getMessage());
        }
    }

}
