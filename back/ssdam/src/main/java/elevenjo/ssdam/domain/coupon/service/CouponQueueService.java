package elevenjo.ssdam.domain.coupon.service;

import elevenjo.ssdam.domain.coupon.dto.response.CouponQueueStatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CouponQueueService {

    private final RedisTemplate<String, String> redisTemplate;
    private final SseService sseService;

    public void enterQueue(Long couponId, Long userId) {
        String key = "coupon:queue:" + couponId;
        long now = System.currentTimeMillis();
        Boolean exists = redisTemplate.opsForZSet().score(key, userId.toString()) != null;
        if (!exists) {
            redisTemplate.opsForZSet().add(key, userId.toString(), now);
        }
    }

    public void sendQueueStatus(Long couponId, Long userId) {
        String key = "coupon:queue:" + couponId;
        Long rank = redisTemplate.opsForZSet().rank(key, userId.toString());
        if (rank == null) return;

        int position = rank.intValue() + 1;
        // 예를 들어, 처리 시간이 순번에 따라 2초씩 증가한다고 가정
        long estimatedTime = position * 2L;

        sseService.sendQueueStatus(userId, new CouponQueueStatusResponse(position, estimatedTime));
    }

    public void removeFromQueue(Long couponId, Long userId) {
        String key = "coupon:queue:" + couponId;
        redisTemplate.opsForZSet().remove(key, userId.toString());
    }

    public List<String> pollNextUsers(Long couponId, int batchSize) {
        String key = "coupon:queue:" + couponId;
        Set<String> userSet = redisTemplate.opsForZSet().range(key, 0, batchSize - 1);

        if (userSet == null || userSet.isEmpty()) {
            return List.of();
        }
        userSet.forEach(user -> redisTemplate.opsForZSet().remove(key, user));

        return new ArrayList<>(userSet);
    }
}