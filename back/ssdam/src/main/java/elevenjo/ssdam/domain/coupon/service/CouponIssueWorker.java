package elevenjo.ssdam.domain.coupon.service;

import elevenjo.ssdam.domain.coupon.dto.response.CouponResultResponse;
import elevenjo.ssdam.domain.coupon.repository.CouponIssuedRepository;
import elevenjo.ssdam.global.sse.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class CouponIssueWorker {

    private final CouponIssuedRepository couponIssuedRepository;
    private final CouponQueueService queueService;
    private final RedisTemplate<String, String> redisTemplate;
    private final SseService sseService;

    // TODO: 나중에 시간과 배치 사이즈 조정
    @Scheduled(fixedDelay = 1000)
    @Transactional
    public void processQueue() {
        Set<String> keys = redisTemplate.keys("coupon:queue:*");

        if (keys == null || keys.isEmpty()) {
            return;
        }

        for (String key : keys) {

            String couponIdStr = key.substring("coupon:queue:".length());
            Long couponId = Long.valueOf(couponIdStr);

            List<String> userIds = queueService.pollNextUsers(couponId, 100);

            if (userIds.isEmpty()) {
                continue;
            }

            for (String nextUserId : userIds) {
                processSingleUser(couponId, nextUserId);
            }
        }
    }

    private void processSingleUser(Long couponId, String userIdStr) {
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

            couponIssuedRepository.insertCouponIssued(userIdLong, couponId);

            // 발급 성공 메시지 전송
            sseService.sendCouponResult(userIdLong,
                    new CouponResultResponse(true, "쿠폰 발급 완료!"));
        } catch (Exception e) {
            // 그 외 예외 발생 시 실패 메시지 전송
            sseService.sendCouponResult(userIdLong,
                    new CouponResultResponse(false, "쿠폰 발급에 실패했습니다."));
            log.error("[CouponIssueWorker] 쿠폰 발급 중 예외 발생 - couponId: {}, userId: {}, 메시지: {}", couponId, userIdLong, e.getMessage());
        }
    }

}
