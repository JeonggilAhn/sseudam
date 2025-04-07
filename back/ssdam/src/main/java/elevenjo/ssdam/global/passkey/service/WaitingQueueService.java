package elevenjo.ssdam.global.passkey.service;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class WaitingQueueService {

    private static final String PASSKEY_PREFIX = "passkey:";      // passkey 저장 key 접두사
    private static final String QUEUE_KEY = "waiting:queue";        // 대기열용 Redis Sorted Set key
    private static final long PASSKEY_TTL_SECONDS = 600;             // passkey TTL (예: 60초)

    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    public WaitingQueueService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // userId에 해당하는 passkey가 있는지 확인
    public boolean hasPasskey(String userId) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(PASSKEY_PREFIX + userId));
    }

    // passkey가 없으면 유저를 대기열에 등록 (현재 시간을 score로 사용)
    public void enqueueUser(String userId) {
        double score = Instant.now().toEpochMilli();
        redisTemplate.opsForZSet().add(QUEUE_KEY, userId, score);
    }

    // 해당 userId에 대해 랜덤 passkey를 발급하고 TTL을 설정
    public String issuePasskey(String userId) {
        /**
         * UUID 왜?
         */
//        String passkey = UUID.randomUUID().toString();
        String passkey = userId;
        redisTemplate.opsForValue().set(PASSKEY_PREFIX + userId, passkey, PASSKEY_TTL_SECONDS, TimeUnit.SECONDS);
        return passkey;
    }

    // 이미 passkey가 있는 경우 TTL을 갱신
    public void refreshPasskey(String userId) {
        redisTemplate.expire(PASSKEY_PREFIX + userId, PASSKEY_TTL_SECONDS, TimeUnit.SECONDS);
    }

    // 스케줄러에서 호출 – 대기열에서 상위(limit)명의 유저에게 passkey를 발급
    public void processQueue(int limit) {
        Set<String> userIds = redisTemplate.opsForZSet().range(QUEUE_KEY, 0, limit - 1);
        if (userIds != null) {
            for (String userId : userIds) {
                // 대기열에서 제거한 후 passkey 발급
                redisTemplate.opsForZSet().remove(QUEUE_KEY, userId);
                issuePasskey(userId);
            }
        }
    }
}
