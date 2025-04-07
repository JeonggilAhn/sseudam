package elevenjo.ssdam.domain.coupon.controller;

import elevenjo.ssdam.domain.coupon.dto.request.CouponQueueEnterRequestDto;
import elevenjo.ssdam.domain.coupon.dto.request.CouponValidateRequestDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponResponseDto;
import elevenjo.ssdam.domain.coupon.service.CouponQueueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import elevenjo.ssdam.domain.coupon.dto.request.CouponCreateRequestDto;
import elevenjo.ssdam.domain.coupon.dto.response.CouponCreateResponseDto;
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
    private final CouponQueueService queueService;

    @PostMapping("/coupons/create")
    public ResponseEntity<ResponseWrapper<CouponCreateResponseDto>> createCoupon(
        @RequestBody CouponCreateRequestDto requestDto
    ){
        System.out.println(requestDto.savingId());
        CouponCreateResponseDto responseDto = couponService.create(requestDto);

        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, responseDto);
    }

    @PostMapping("/coupons/enter")
    public ResponseEntity<Void> enterQueue(@RequestBody CouponQueueEnterRequestDto dto,
                                           @AuthenticationPrincipal User user) {

        queueService.enterQueue(dto.couponId(), user.getUserId());
        queueService.sendQueueStatus(dto.couponId(), user.getUserId());
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/coupons/issue")
//    public ResponseEntity<ResponseWrapper<CouponIssueResponseDto>> issueCoupon(
//            @RequestBody CouponIssueRequestDto requestDto,
//            @AuthenticationPrincipal User user
//    ){
//        CouponIssueResponseDto response = couponService.issueCoupon(requestDto, user);
//        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, response);
//    }

    @GetMapping("/coupons/list")
    public ResponseEntity<ResponseWrapper<List<CouponResponseDto>>> getCouponList(){
         List<CouponResponseDto> couponList =  couponService.getCouponList();
         return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, couponList);
    };

    @PostMapping("/coupons/validate")
    public ResponseEntity<ResponseWrapper<Boolean>> validateCoupon(@RequestBody CouponValidateRequestDto cvDto,
                                                                   @AuthenticationPrincipal User user){
        boolean hasRecieved = couponService.checkCouponIssued(user.getUserId(), cvDto.getCouponId());
        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, hasRecieved);
    };

}
