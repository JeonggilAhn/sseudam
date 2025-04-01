package elevenjo.ssdam.domain.card.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.CARD_ALREADY_EXITSTS)
public class CardDuplicateException extends BaseRuntimeException {
    public CardDuplicateException(){
        super();
    }
}
