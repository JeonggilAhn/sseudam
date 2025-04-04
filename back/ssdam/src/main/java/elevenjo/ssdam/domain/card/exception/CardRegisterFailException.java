package elevenjo.ssdam.domain.card.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.CARD_REGISTER_FAIL)
public class CardRegisterFailException extends BaseRuntimeException {
    public CardRegisterFailException(){
        super();
    }
}