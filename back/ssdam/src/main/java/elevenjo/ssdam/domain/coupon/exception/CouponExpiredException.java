package elevenjo.ssdam.domain.coupon.exception;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;

@CustomException(ExceptionCode.COUPON_EXPIRED)
public class CouponExpiredException extends BaseRuntimeException {
}
