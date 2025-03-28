package elevenjo.ssdam.domain.coupon.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import elevenjo.ssdam.domain.coupon.dto.request.CouponCreateRequestDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponCreateResponseDto;
import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.coupon.repository.CouponRepository;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.exception.SavingNotFoundException;
import elevenjo.ssdam.domain.saving.repository.SavingRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final SavingRepository savingRepository;

    @Transactional
    public CouponCreateResponseDto create(CouponCreateRequestDto requestDto) {
        Saving saving = savingRepository.findById(requestDto.savingId())
            .orElseThrow(SavingNotFoundException::new);

        Coupon coupon = requestDto.toEntity(saving);
        couponRepository.save(coupon);

        return CouponCreateResponseDto.of(coupon, saving);
    }
}
