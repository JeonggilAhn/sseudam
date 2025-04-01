package elevenjo.ssdam.domain.payment.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.FAIL_TO_DECRYPT)
public class DecryptFailException extends BaseRuntimeException {
}
