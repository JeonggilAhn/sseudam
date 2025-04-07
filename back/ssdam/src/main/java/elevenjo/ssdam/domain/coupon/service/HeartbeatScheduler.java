package elevenjo.ssdam.domain.coupon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class HeartbeatScheduler {

    private final SseService sseService;

    @Scheduled(fixedRate = 60000)
    public void sendHeartbeatToAllUsers() {
        sseService.sendHeartbeatToAll();
    }
}
