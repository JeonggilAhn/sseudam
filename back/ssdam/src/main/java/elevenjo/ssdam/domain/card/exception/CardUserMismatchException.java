package elevenjo.ssdam.domain.card.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.CARD_USER_MISMATCH)
public class CardUserMismatchException extends BaseRuntimeException {
    public CardUserMismatchException() {
        super();
    }
}
