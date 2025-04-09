package elevenjo.ssdam.global.sse;

import lombok.Getter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Getter
public class ManagedSseEmitter {
    private final SseEmitter emitter;
    private volatile boolean finalResultSent = false;

    public ManagedSseEmitter(SseEmitter emitter) {
        this.emitter = emitter;
    }

    public void markFinalResultSent() {
        this.finalResultSent = true;
    }
}
