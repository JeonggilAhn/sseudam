package elevenjo.ssdam.domain.payment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import elevenjo.ssdam.domain.payment.dto.PaymentUserDto;
import elevenjo.ssdam.domain.payment.dto.UserDto;
import elevenjo.ssdam.domain.payment.service.PaymentService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(final PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/payments")
    public ResponseEntity<Void> generateCardTransaction (
            @RequestParam Integer count,
            @RequestBody UserDto userDto
    ) {
        PaymentUserDto paymentUserDto = paymentService.getPaymentUserInfo(userDto.userId());

        for (int i = 0; i < count; i++){
            paymentService.generatePayment(paymentUserDto);
        }

        return ResponseEntity.ok().build();
    }
}
