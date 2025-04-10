package elevenjo.ssdam.global.sse;

import lombok.Getter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Getter
public class ManagedSseEmitter {
    private final Long couponId;
    private final SseEmitter emitter;
    private volatile boolean finalResultSent = false;

    public ManagedSseEmitter(Long couponId, SseEmitter emitter) {
        this.couponId = couponId;
        this.emitter = emitter;
    }

    public void markFinalResultSent() {
        this.finalResultSent = true;
    }
}
