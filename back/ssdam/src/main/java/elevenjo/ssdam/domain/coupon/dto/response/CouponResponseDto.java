package elevenjo.ssdam.domain.coupon.dto.response;

import elevenjo.ssdam.domain.coupon.entity.CouponType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
@Slf4j
public class CouponResponseDto {
    private long couponId;
    private String couponName;
    private CouponType couponType;
    private long savingId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime couponDeadline;
}
