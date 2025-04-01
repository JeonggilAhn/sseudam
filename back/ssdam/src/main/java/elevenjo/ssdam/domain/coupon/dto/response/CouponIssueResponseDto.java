package elevenjo.ssdam.domain.coupon.dto.response;

import elevenjo.ssdam.domain.coupon.entity.CouponIssued;

public record CouponIssueResponseDto(
        Long couponIssuedId,
        String userEmail,
        Long couponId
) {
    public static CouponIssueResponseDto of(CouponIssued couponIssued) {
        return new CouponIssueResponseDto(
                couponIssued.getCouponIssuedId(),
                couponIssued.getUser().getUserEmail(),
                couponIssued.getCoupon().getCouponId()
        );
    }
}
