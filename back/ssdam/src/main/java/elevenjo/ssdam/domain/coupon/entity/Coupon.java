package elevenjo.ssdam.domain.coupon.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.global.jpa.base.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private Saving saving;

    @Builder
    public Coupon(String couponName, Integer couponCnt, LocalDateTime couponDeadline, Saving saving) {
        this.couponName = couponName;
        this.couponCnt = couponCnt;
        this.couponDeadline = couponDeadline;
        this.saving = saving;
    }
}
