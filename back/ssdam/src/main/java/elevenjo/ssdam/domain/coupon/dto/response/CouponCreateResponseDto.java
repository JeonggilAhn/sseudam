package elevenjo.ssdam.domain.coupon.dto.response;

import java.time.LocalDateTime;

import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.saving.entity.Saving;

public record CouponCreateResponseDto(
    String couponName,
    Integer couponCnt,
    LocalDateTime couponDeadLine,
    Long savingId
) {
    public static CouponCreateResponseDto of(Coupon coupon, Saving saving) {
        return new CouponCreateResponseDto(
            coupon.getCouponName(),
            coupon.getCouponCnt(),
            coupon.getCouponDeadline(),
            saving.getSavingId()
        );
    }
}