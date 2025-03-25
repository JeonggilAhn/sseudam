package elevenjo.ssdam.domain.user.exception;


import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.USER_NOT_FOUND)
public class UserNotFoundException extends BaseRuntimeException {
}
