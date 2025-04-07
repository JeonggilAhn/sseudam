package elevenjo.ssdam.domain.coupon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class CouponQueueStatusScheduler {

    private final RedisTemplate<String, String> redisTemplate;
    private final CouponQueueService couponQueueService;

    // 5초마다 실행
    @Scheduled(fixedRate = 5000)
    public void updateQueueStatuses() {
        // Redis의 모든 쿠폰 큐 키 조회 (예: coupon:queue:{couponId})
        Set<String> keys = redisTemplate.keys("coupon:queue:*");
        if (keys == null || keys.isEmpty()) {
            return;
        }
        for (String key : keys) {
            // 키에서 couponId 추출 (예: "coupon:queue:" 제거)
            String couponIdStr = key.substring("coupon:queue:".length());
            Long couponId = Long.valueOf(couponIdStr);

            // 해당 큐에 있는 모든 사용자 ID 조회
            Set<String> userIds = redisTemplate.opsForZSet().range(key, 0, -1);
            if (userIds == null || userIds.isEmpty()) {
                continue;
            }
            // 각 사용자에 대해 상태 업데이트 전송
            for (String userIdStr : userIds) {
                Long userId = Long.valueOf(userIdStr);
                couponQueueService.sendQueueStatus(couponId, userId);
            }
        }
    }
}
