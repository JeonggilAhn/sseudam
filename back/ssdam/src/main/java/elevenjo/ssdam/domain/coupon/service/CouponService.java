package elevenjo.ssdam.domain.coupon.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import elevenjo.ssdam.domain.coupon.dto.request.CouponCreateRequestDto;
import elevenjo.ssdam.domain.coupon.dto.request.CouponIssueRequestDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponCreateResponseDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponIssueResponseDto;
import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.coupon.entity.CouponIssued;
import elevenjo.ssdam.domain.coupon.exception.CouponAlreadyIssuedException;
import elevenjo.ssdam.domain.coupon.exception.CouponExpiredException;
import elevenjo.ssdam.domain.coupon.exception.CouponNotFoundException;
import elevenjo.ssdam.domain.coupon.exception.CouponOutOfStockException;
import elevenjo.ssdam.domain.coupon.repository.CouponIssuedRepository;
import elevenjo.ssdam.domain.coupon.repository.CouponRepository;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.exception.SavingNotFoundException;
import elevenjo.ssdam.domain.saving.repository.SavingRepository;
import elevenjo.ssdam.domain.user.entity.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final SavingRepository savingRepository;
    private final CouponIssuedRepository couponIssuedRepository;

    @Transactional
    public CouponCreateResponseDto create(CouponCreateRequestDto requestDto) {
        Saving saving = savingRepository.findById(requestDto.savingId())
            .orElseThrow(SavingNotFoundException::new);

        Coupon coupon = requestDto.toEntity(saving);
        couponRepository.save(coupon);

        return CouponCreateResponseDto.of(coupon, saving);
    }

    @Transactional
    public CouponIssueResponseDto issueCoupon(CouponIssueRequestDto requestDto, User user) {
        Coupon coupon = couponRepository.findById(requestDto.couponId())
                .orElseThrow(CouponNotFoundException::new);

        validateCouponNotExpired(coupon);
        validateCouponStockAvailable(coupon);
        validateCouponNotAlreadyIssued(coupon, user);

        coupon.decreaseCouponCnt();

        CouponIssued couponIssued = CouponIssued.of(user, coupon);
        couponIssuedRepository.save(couponIssued);

        return CouponIssueResponseDto.of(couponIssued);
    }

    private void validateCouponNotExpired(Coupon coupon) {
        if (coupon.getCouponDeadline().isBefore(LocalDateTime.now())) {
            throw new CouponExpiredException(); // 필요 시 커스텀 예외
        }
    }

    private void validateCouponStockAvailable(Coupon coupon) {
        if (coupon.getCouponCnt() == null || coupon.getCouponCnt() <= 0) {
            throw new CouponOutOfStockException();
        }
    }

    private void validateCouponNotAlreadyIssued(Coupon coupon, User user) {
        if (couponIssuedRepository.existsByCouponAndUser(coupon, user)) {
            throw new CouponAlreadyIssuedException();
        }
    }

}
