package elevenjo.ssdam.domain.coupon.entity;

import java.time.LocalDateTime;

import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.global.jpa.base.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Coupon extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long couponId;

    @Column(nullable = false)
    private String couponName;

    private Integer couponCnt;

    private LocalDateTime couponDeadline;

    @ManyToOne
    @JoinColumn(name = "saving_id")
    private Saving saving;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CouponType couponType;

    @Builder
    public Coupon(
        String couponName,
        Integer couponCnt,
        LocalDateTime couponDeadline,
        Saving saving,
        CouponType couponType)
    {
        this.couponName = couponName;
        this.couponCnt = couponCnt;
        this.couponDeadline = couponDeadline;
        this.saving = saving;
        this.couponType = couponType;
    }

//    public void decreaseCouponCnt() {
//        // 무제한 쿠폰
//        if (this.couponCnt == null) {
//            return;
//        }
//
//        if (this.couponCnt <= 0) {
//            throw new CouponOutOfStockException();
//        }
//
//        this.couponCnt--;
//    }
}
