package elevenjo.ssdam.domain.coupon.service;

import elevenjo.ssdam.global.sse.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class HeartbeatScheduler {

    private final SseService sseService;

    // 이 수치는 45000이상이면 안됨.
    // 45초 이상 메시지가 송수신되지 않으면 타임아웃으로 연결을 끊어버림
    @Scheduled(fixedRate = 30000)
    public void sendHeartbeatToAllUsers() {
        sseService.sendHeartbeatToAll();
    }
}
