package elevenjo.ssdam.domain.coupon.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.jpa.base.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CouponIssued extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long couponIssuedId;

    private LocalDateTime usedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @OneToOne(fetch = FetchType.LAZY)
    private Coupon coupon;

    @Builder
    public CouponIssued(LocalDateTime usedAt, User user, Coupon coupon) {
        this.usedAt = usedAt;
        this.user = user;
        this.coupon = coupon;
    }

    public static CouponIssued of(User user, Coupon coupon) {
        return CouponIssued.builder()
                .usedAt(null)
                .user(user)
                .coupon(coupon)
                .build();
    }
}
