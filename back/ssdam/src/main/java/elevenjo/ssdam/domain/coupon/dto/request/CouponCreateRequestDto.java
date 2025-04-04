package elevenjo.ssdam.domain.coupon.dto.request;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.coupon.entity.CouponType;
import elevenjo.ssdam.domain.saving.entity.Saving;

public record CouponCreateRequestDto(
    String couponName,
    Integer couponCnt,
    String couponDeadlineDate,
    String couponDeadlineTime,
    Long savingId,
    String couponType
) {
    public Coupon toEntity(Saving saving) {

        LocalDate date = LocalDate.parse(couponDeadlineDate, DateTimeFormatter.ofPattern("yyyyMMdd"));
        LocalTime time = LocalTime.parse(couponDeadlineTime);
        LocalDateTime couponDeadline = LocalDateTime.of(date, time);

        CouponType type = CouponType.valueOf(couponType.toUpperCase());

        return Coupon.builder()
            .couponName(couponName)
            .couponCnt(couponCnt)
            .couponDeadline(couponDeadline)
            .saving(saving)
            .couponType(type)
            .build();
    }
}