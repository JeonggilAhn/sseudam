package elevenjo.ssdam.global.sse;

import elevenjo.ssdam.domain.coupon.dto.response.CouponQueueStatusResponse;
import elevenjo.ssdam.domain.coupon.dto.response.CouponResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
@RequiredArgsConstructor
public class SseService {
    private final ConcurrentMap<Long, ManagedSseEmitter> emitters = new ConcurrentHashMap<>();

    private final RedisTemplate<String, String> redisTemplate;

    @Scheduled(fixedRate = 1000)
    public void updateQueueStatuses() {
        for(Long userId : emitters.keySet()) {
            ManagedSseEmitter emitter = emitters.get(userId);
            String key = emitter.getCouponId().toString();
            if (key == null || key.isEmpty()) {
                continue;
            }

            Long rank = redisTemplate.opsForZSet().rank("coupon:queue:" + key, userId.toString());
            if (rank == null) continue;
            int position = rank.intValue() + 1;

            long estimatedTime = ((position - 1) / 100 + 1) * 2L;

            sendQueueStatus(userId, new CouponQueueStatusResponse(position, estimatedTime));
        }
    }

    public SseEmitter subscribe(Long userId, Long couponId) {
        SseEmitter emitter = new SseEmitter(0L);
        ManagedSseEmitter managedEmitter = new ManagedSseEmitter(couponId, emitter);
        emitters.put(userId, managedEmitter);

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> {
            emitter.complete();
            emitters.remove(userId);
        });
        return emitter;
    }

    public void sendCouponResult(Long userId, CouponResultResponse response) {
        ManagedSseEmitter managedEmitter = emitters.get(userId);
        if (managedEmitter != null) {
            SseEmitter emitter = managedEmitter.getEmitter();
            try {
                emitter.send(response);
                // 최종 결과 전송 완료 상태 설정
                managedEmitter.markFinalResultSent();
                // 이후에 하트비트나 다른 상태 업데이트에서 삭제하지 않도록 함.
            } catch (IOException e) {
                emitter.completeWithError(e);
                emitters.remove(userId);
            }
        }
    }

    public void sendQueueStatus(Long userId, CouponQueueStatusResponse response) {
        ManagedSseEmitter managedEmitter = emitters.get(userId);
        if (managedEmitter != null) {
            // 이미 최종 결과가 전송되었다면 상태 업데이트를 보내지 않음
            if(managedEmitter.isFinalResultSent()){
                return;
            }
            SseEmitter emitter = managedEmitter.getEmitter();
            try {
                emitter.send(response);
            } catch (IOException e) {
                emitter.completeWithError(e);
                emitters.remove(userId);
            }
        }
    }

    public void sendHeartbeat(Long userId) {
        ManagedSseEmitter managedEmitter = emitters.get(userId);
        if (managedEmitter != null) {
            // 최종 결과 전송 후에는 heartbeat를 보내지 않도록 할 수도 있음
            if(managedEmitter.isFinalResultSent()){
                return;
            }
            SseEmitter emitter = managedEmitter.getEmitter();
            try {
                emitter.send(SseEmitter.event().name("heartbeat").data("ping"));
            } catch (IOException e) {
                emitter.completeWithError(e);
                emitters.remove(userId);
            }
        }
    }

    public void sendHeartbeatToAll() {
        for (Long userId : emitters.keySet()) {
            sendHeartbeat(userId);
        }
    }
}
