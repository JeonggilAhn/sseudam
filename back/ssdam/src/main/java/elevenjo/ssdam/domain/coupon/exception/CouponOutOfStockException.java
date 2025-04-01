package elevenjo.ssdam.domain.coupon.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.COUPON_OUT_OF_STOCK)
public class CouponOutOfStockException extends BaseRuntimeException {
}
