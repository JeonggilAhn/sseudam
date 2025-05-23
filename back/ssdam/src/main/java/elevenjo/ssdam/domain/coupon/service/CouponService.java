package elevenjo.ssdam.domain.coupon.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import elevenjo.ssdam.domain.coupon.dto.response.CouponResponseDto;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import elevenjo.ssdam.domain.coupon.dto.request.CouponCreateRequestDto;
import elevenjo.ssdam.domain.coupon.dto.request.CouponIssueRequestDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponCreateResponseDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponIssueResponseDto;
import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.coupon.entity.CouponIssued;
import elevenjo.ssdam.domain.coupon.entity.CouponType;
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
    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public CouponCreateResponseDto create(CouponCreateRequestDto requestDto) {
        Saving saving = savingRepository.findById(requestDto.savingId())
            .orElseThrow(SavingNotFoundException::new);

        Coupon coupon = requestDto.toEntity(saving);
        couponRepository.save(coupon);

        if (coupon.getCouponType() == CouponType.POPULAR_LIMITED) {
            String redisKey = "coupon:list:" + coupon.getCouponId();

            List<String> dummyValues = Collections.nCopies(coupon.getCouponCnt(), "1");
            redisTemplate.opsForList().rightPushAll(redisKey, dummyValues);
//            for (int i = 0; i < coupon.getCouponCnt(); i++) {
//                // 재고 개수가 중요하고, 리스트 내용은 중요하지 않기 때문에 더미 데이터("1") 삽입
//                redisTemplate.opsForList().rightPush(redisKey, "1");
//            }
        } else {
            String redisKey = "coupon:counter:" + coupon.getCouponId();
            redisTemplate.opsForValue().set(redisKey, coupon.getCouponCnt().toString());
        }

        return CouponCreateResponseDto.of(coupon, saving);
    }

    @Transactional
    public CouponIssueResponseDto issueCoupon(CouponIssueRequestDto requestDto, User user) {
        Coupon coupon = couponRepository.findById(requestDto.couponId())
                .orElseThrow(CouponNotFoundException::new);

        validateCouponNotExpired(coupon);
        validateCouponStockAvailable(coupon);
        validateCouponNotAlreadyIssued(coupon, user);

        if (coupon.getCouponType() == CouponType.POPULAR_LIMITED) {
            String redisKey = "coupon:list:" + coupon.getCouponId();
            Object popped = redisTemplate.opsForList().rightPop(redisKey);
            if (popped == null) {
                throw new CouponOutOfStockException();
            }
        } else if (coupon.getCouponType() == CouponType.NORMAL_LIMITED) {
            String redisKey = "coupon:counter:" + coupon.getCouponId();
            Long remaining = redisTemplate.opsForValue().decrement(redisKey);
            if (remaining == null || remaining < 0) {
                throw new CouponOutOfStockException();
            }
        }
        // coupon의 coupon_cnt는 쿠폰의 초기 수량을 의미하는 것으로 변경됨
//        coupon.decreaseCouponCnt();

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

    public List<CouponResponseDto> getCouponList() {
        try{
            List<CouponResponseDto> couponList = new ArrayList<>();
            List<Coupon> tmpCouponList = couponRepository.findAll();
            for (int i = 0; i < tmpCouponList.size(); i++) {
                CouponResponseDto tmpCoupon = new CouponResponseDto();
                tmpCoupon.setCouponId(tmpCouponList.get(i).getCouponId());
                tmpCoupon.setCouponName(tmpCouponList.get(i).getCouponName());
                tmpCoupon.setCouponType(tmpCouponList.get(i).getCouponType());
                tmpCoupon.setSavingId(tmpCouponList.get(i).getSaving().getSavingId());
                tmpCoupon.setCouponDeadline(tmpCouponList.get(i).getCouponDeadline());
                tmpCoupon.setCreatedAt(tmpCouponList.get(i).getCreatedAt());
                tmpCoupon.setUpdatedAt(tmpCouponList.get(i).getUpdatedAt());
                couponList.add(tmpCoupon);
            }

            return couponList;
        }
        catch (Exception e) {
            throw new CouponNotFoundException();
        }

    }

    public boolean checkCouponIssued(long userId,long couponId){
        boolean isCouponIssued = false;
        try {
            List<CouponIssued> tmpCouponIssuedList = couponIssuedRepository.findByUser_UserId(userId);
            for(CouponIssued issued : tmpCouponIssuedList){
                if (issued.getCoupon().getCouponId() == couponId){
                    isCouponIssued = true;
                    break;
                }
            }
        return isCouponIssued;

        } catch (Exception e) {
            throw new CouponNotFoundException();
        }
    };
}
