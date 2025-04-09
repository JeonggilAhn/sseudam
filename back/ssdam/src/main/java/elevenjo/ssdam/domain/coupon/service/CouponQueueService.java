package elevenjo.ssdam.domain.coupon.service;

import elevenjo.ssdam.domain.coupon.dto.response.CouponQueueStatusResponse;
import elevenjo.ssdam.domain.coupon.exception.CouponNotFoundException;
import elevenjo.ssdam.global.sse.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
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
        Set<String> userSet = redisTemplate.opsForZSet().range(key, 0, batchSize - 1);

        // score와 함께 조회
        Set<ZSetOperations.TypedTuple<String>> tuples = redisTemplate.opsForZSet().rangeWithScores(key, 0, batchSize - 1);

        if (tuples == null || tuples.isEmpty()) {
            return List.of();
        }

        // score 기준으로 정렬 (이미 정렬되어 있다고 하더라도 안전하게)
        List<ZSetOperations.TypedTuple<String>> sortedList = new ArrayList<>(tuples);
        sortedList.sort(Comparator.comparingDouble(tuple -> tuple.getScore() != null ? tuple.getScore() : 0));

        // 정렬된 리스트에서 사용자 ID만 추출
        List<String> userIds = sortedList.stream()
                .map(ZSetOperations.TypedTuple::getValue)
                .collect(Collectors.toList());

        // ZSet에서 해당 사용자들을 제거
        userIds.forEach(user -> {
            Long removedCount = redisTemplate.opsForZSet().remove(key, user);
        });

        return userIds;
    }
}