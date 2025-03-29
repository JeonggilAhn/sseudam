package elevenjo.ssdam.domain.coupon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import elevenjo.ssdam.domain.coupon.entity.Coupon;

@Repository
public interface CouponIssuedRepository extends JpaRepository<Coupon, Long> {
}
