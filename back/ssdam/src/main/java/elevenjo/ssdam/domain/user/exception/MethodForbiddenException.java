package elevenjo.ssdam.domain.user.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.METHOD_FORBIDDEN)
public class MethodForbiddenException extends BaseRuntimeException {
}
