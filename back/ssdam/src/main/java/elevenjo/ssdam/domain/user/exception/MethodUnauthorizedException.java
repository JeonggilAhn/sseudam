package elevenjo.ssdam.domain.user.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.METHOD_UNAUTHORIZED)
public class MethodUnauthorizedException extends BaseRuntimeException {
}
