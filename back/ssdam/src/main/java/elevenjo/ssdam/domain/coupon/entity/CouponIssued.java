package elevenjo.ssdam.domain.coupon.entity;

import java.time.LocalDateTime;

import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.jpa.base.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(
        name = "coupon_issued",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "coupon_id"})
        }
)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CouponIssued extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long couponIssuedId;

    @Column(nullable = false)
    private Boolean isUsed;

    private LocalDateTime usedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @Builder
    public CouponIssued(LocalDateTime usedAt, User user, Coupon coupon) {
        this.isUsed = false;
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
