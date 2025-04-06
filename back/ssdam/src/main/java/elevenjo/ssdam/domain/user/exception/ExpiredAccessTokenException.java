package elevenjo.ssdam.domain.user.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.EXPIRED_ACCESS_TOKEN)
public class ExpiredAccessTokenException extends BaseRuntimeException {
}
