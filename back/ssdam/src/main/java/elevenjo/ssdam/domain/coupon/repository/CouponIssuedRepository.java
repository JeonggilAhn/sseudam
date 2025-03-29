package elevenjo.ssdam.domain.coupon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.coupon.entity.CouponIssued;
import elevenjo.ssdam.domain.user.entity.User;

@Repository
public interface CouponIssuedRepository extends JpaRepository<CouponIssued, Long> {
    boolean existsByCouponId(Coupon coupon, User user);
}
