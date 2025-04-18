package elevenjo.ssdam.domain.coupon.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.coupon.entity.CouponIssued;
import elevenjo.ssdam.domain.user.entity.User;

import java.util.List;

@Repository
public interface CouponIssuedRepository extends JpaRepository<CouponIssued, Long> {
    boolean existsByCouponAndUser(Coupon coupon, User user);

    Coupon findByCoupon(Coupon coupon);

    Coupon coupon(Coupon coupon);

    List<CouponIssued> findByUser_UserId(Long userUserId);

    @Query(value = "INSERT INTO coupon_issued (user_id, coupon_id, is_used, created_at, updated_at) VALUES (:userId, :couponId, false, NOW(), NOW())", nativeQuery = true)
    void insertCouponIssued(Long userId, Long couponId);
}
