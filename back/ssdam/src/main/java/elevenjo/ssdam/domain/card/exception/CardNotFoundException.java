package elevenjo.ssdam.domain.card.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.CARD_NOT_FOUND)
public class CardNotFoundException extends BaseRuntimeException {
    public CardNotFoundException() {
        super();
    }
}
