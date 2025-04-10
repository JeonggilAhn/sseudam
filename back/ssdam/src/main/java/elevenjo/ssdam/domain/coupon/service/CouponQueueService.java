package elevenjo.ssdam.domain.coupon.service;

import elevenjo.ssdam.domain.coupon.dto.response.CouponQueueStatusResponse;
import elevenjo.ssdam.domain.coupon.exception.CouponNotFoundException;
import elevenjo.ssdam.global.sse.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CouponQueueService {

    private final RedisTemplate<String, String> redisTemplate;
    private final SseService sseService;

    public void enterQueue(Long couponId, Long userId) {
        if (couponId == null) {
            throw new CouponNotFoundException();
        }
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
        Set<TypedTuple<String>> typedTupleSet = redisTemplate.opsForZSet().popMin(key, batchSize);

        if (typedTupleSet == null || typedTupleSet.isEmpty()) {
            return List.of();
        }

        // TypedTuple에서 실제 값만 추출
        List<String> userList = typedTupleSet.stream()
                .map(TypedTuple::getValue)
                .collect(Collectors.toList());

        return userList;
    }

}