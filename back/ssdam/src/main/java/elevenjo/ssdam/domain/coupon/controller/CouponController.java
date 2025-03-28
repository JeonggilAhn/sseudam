package elevenjo.ssdam.domain.coupon.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import elevenjo.ssdam.domain.coupon.dto.request.CouponCreateRequestDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponCreateResponseDto;
import elevenjo.ssdam.domain.coupon.entity.Coupon;
import elevenjo.ssdam.domain.coupon.service.CouponService;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;

    @PostMapping("/coupon/create")
    public ResponseEntity<ResponseWrapper<CouponCreateResponseDto>> createCoupon(
        @RequestBody CouponCreateRequestDto requestDto
    ){
        System.out.println(requestDto.savingId());
        CouponCreateResponseDto responseDto = couponService.create(requestDto);

        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, responseDto);
    }
}
