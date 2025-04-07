package elevenjo.ssdam.domain.coupon.repository;

import elevenjo.ssdam.domain.coupon.entity.CouponType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import elevenjo.ssdam.domain.coupon.entity.Coupon;

import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> findAllByCouponType(CouponType couponType);
}
