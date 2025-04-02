package elevenjo.ssdam.domain.coupon.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@RequiredArgsConstructor
@Slf4j
public class CouponRequestDto {
    private long couponId;
    private long userId;
}