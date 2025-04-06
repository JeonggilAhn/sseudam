package elevenjo.ssdam.domain.saving.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.SAVING_NOT_FOUND)
public class SavingNotFoundException extends BaseRuntimeException {
}
