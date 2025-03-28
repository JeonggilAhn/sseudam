<<<<<<< HEAD
package elevenjo.ssdam.domain.saving.exception;

public class SavingNotFoundException extends RuntimeException {
    public SavingNotFoundException() {
        super("해당 적금 상품을 찾을 수 없습니다.");
    }
}
=======
package elevenjo.ssdam.domain.saving.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.SAVING_NOT_FOUND)
public class SavingNotFoundException extends BaseRuntimeException {
}
>>>>>>> ed947f0 (✨ feat : 쿠폰 생성 api 구현 #S12P21A106-347)
