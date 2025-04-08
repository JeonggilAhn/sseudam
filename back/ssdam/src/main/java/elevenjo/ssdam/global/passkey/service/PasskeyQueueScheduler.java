package elevenjo.ssdam.global.passkey.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PasskeyQueueScheduler {

    private final PasskeyWaitingQueueUtil passkeyWaitingQueueUtil;
    private static final int ISSUE_LIMIT = 10;  // 한 번에 처리할 유저 수 (예: 10명)

    @Autowired
    public PasskeyQueueScheduler(PasskeyWaitingQueueUtil passkeyWaitingQueueUtil) {
        this.passkeyWaitingQueueUtil = passkeyWaitingQueueUtil;
    }

    // 5초마다 실행 (필요에 따라 fixedDelay나 cron 표현식을 조정)
    @Scheduled(fixedDelay = 2000)
    public void processWaitingQueue() {
        passkeyWaitingQueueUtil.processQueue(ISSUE_LIMIT);
    }
}
