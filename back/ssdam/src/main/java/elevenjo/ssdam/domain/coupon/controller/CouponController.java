package elevenjo.ssdam.domain.coupon.controller;

import elevenjo.ssdam.domain.coupon.dto.response.CouponResponseDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import elevenjo.ssdam.domain.coupon.dto.request.CouponCreateRequestDto;
import elevenjo.ssdam.domain.coupon.dto.request.CouponIssueRequestDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponCreateResponseDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponIssueResponseDto;
import elevenjo.ssdam.domain.coupon.service.CouponService;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;

    @PostMapping("/coupons/create")
    public ResponseEntity<ResponseWrapper<CouponCreateResponseDto>> createCoupon(
        @RequestBody CouponCreateRequestDto requestDto
    ){
        System.out.println(requestDto.savingId());
        CouponCreateResponseDto responseDto = couponService.create(requestDto);

        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, responseDto);
    }

    @PostMapping("/coupons/issue")
    public ResponseEntity<ResponseWrapper<CouponIssueResponseDto>> issueCoupon(
            @RequestBody CouponIssueRequestDto requestDto,
            @AuthenticationPrincipal User user
    ){
        CouponIssueResponseDto response = couponService.issueCoupon(requestDto, user);
        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, response);
    }

    @GetMapping("/coupons/list")
    public ResponseEntity<ResponseWrapper<List<CouponResponseDto>>> getCouponList(){
         List<CouponResponseDto> couponList =  couponService.getCouponList();
         return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, couponList);
    };

    @PostMapping("/coupons/validate")
    public ResponseEntity<ResponseWrapper<Boolean>> validateCoupon(@Param("couponId") long couponId,
                                                                   @AuthenticationPrincipal User user){
        boolean hasRecieved = couponService.checkCouponIssued(user.getUserId(), couponId);
        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, hasRecieved);
    };

}
