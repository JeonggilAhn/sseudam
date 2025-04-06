package elevenjo.ssdam.domain.user.exception;

import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

// 추후 수정
@CustomException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND)
public class RefreshTokenNotFoundException extends RuntimeException {
}
