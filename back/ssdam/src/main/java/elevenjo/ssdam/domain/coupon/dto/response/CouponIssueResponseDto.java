package elevenjo.ssdam.domain.coupon.dto.response;

import elevenjo.ssdam.domain.coupon.entity.CouponIssued;

public record CouponIssueResponseDto(
        Long couponIssuedId,
        Long userEmail,
        Long couponId
) {
    public static CouponIssueResponseDto of(CouponIssued couponIssued) {
        return new CouponIssueResponseDto(
                couponIssued.getCouponIssuedId(),
                couponIssued.getUser().getUserId(), // User 엔티티의 PK
                couponIssued.getCoupon().getCouponId()
        );
    }
}
