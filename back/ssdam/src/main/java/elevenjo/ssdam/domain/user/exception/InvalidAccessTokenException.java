package elevenjo.ssdam.domain.user.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.INVALID_ACCESS_TOKEN)
public class InvalidAccessTokenException extends BaseRuntimeException {
}
