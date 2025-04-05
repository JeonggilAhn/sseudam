package elevenjo.ssdam.global.interceptor;


import elevenjo.ssdam.global.passkey.service.WaitingQueueService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import elevenjo.ssdam.domain.user.entity.User;

@Component
public class PasskeyInterceptor implements HandlerInterceptor {

    private final WaitingQueueService waitingQueueService;

    public PasskeyInterceptor(WaitingQueueService waitingQueueService) {
        this.waitingQueueService = waitingQueueService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // SecurityContextHolder에서 인증된 사용자 정보 추출
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            return true; // 인증되지 않은 경우 건너뜀
        }
        User user = (User) auth.getPrincipal();
        String userId = String.valueOf(user.getUserId());

        // passkey가 이미 있으면 TTL을 갱신하고 요청 통과
        if (waitingQueueService.hasPasskey(userId)) {
            waitingQueueService.refreshPasskey(userId);
            return true;
        } else {

            /**
             * 대기열로 보낼 때 어떤식으로 응답을 보내줘야하는지?
             * 대기열 페이지를 만들어서 거기로 redirect를 시켜야하나?
             * or
             *
             */
            // passkey가 없으면 대기열에 등록 후 대기중 메시지 응답
            waitingQueueService.enqueueUser(userId);
//            response.setStatus(HttpServletResponse.SC_TOO_MANY_REQUESTS);
            response.getWriter().write("Waiting in queue, please try again later.");
            return false;
        }
    }
}
