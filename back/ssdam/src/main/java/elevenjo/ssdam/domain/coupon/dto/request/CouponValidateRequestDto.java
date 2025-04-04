package elevenjo.ssdam.domain.coupon.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@RequiredArgsConstructor
public class CouponValidateRequestDto {
    private long couponId;
}
