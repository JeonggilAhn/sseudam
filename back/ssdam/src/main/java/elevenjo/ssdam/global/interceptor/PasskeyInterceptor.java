package elevenjo.ssdam.global.interceptor;


import elevenjo.ssdam.global.passkey.service.PasskeyWaitingQueueUtil;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import elevenjo.ssdam.domain.user.entity.User;

@Component
public class PasskeyInterceptor implements HandlerInterceptor {

    private final PasskeyWaitingQueueUtil passkeyWaitingQueueUtil;

    public PasskeyInterceptor(PasskeyWaitingQueueUtil passkeyWaitingQueueUtil) {
        this.passkeyWaitingQueueUtil = passkeyWaitingQueueUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if("/api/auth/issue".equals(request.getRequestURI())) {
            return true;
        }
        // SecurityContextHolder에서 인증된 사용자 정보 추출
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            return true; // 인증되지 않은 경우 건너뜀
        }
        User user = (User) auth.getPrincipal();
        String userId = String.valueOf(user.getUserId());

        // passkey가 이미 있으면 TTL을 갱신하고 요청 통과
        if (passkeyWaitingQueueUtil.hasPasskey(userId)) {
            passkeyWaitingQueueUtil.refreshPasskey(userId);
            return true;
        } else {
            // passkey가 없으면 대기열에 등록 후 대기중 메시지 응답
            passkeyWaitingQueueUtil.enqueueUser(userId);
            ResponseWrapperFactory.setResponse(
                    response,
                    HttpStatus.ACCEPTED,
                    null,
                    "Waiting in queue, please try again later."
            );

            return false;
        }
    }
}
