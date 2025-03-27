package elevenjo.ssdam.domain.cardTransaction.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import elevenjo.ssdam.domain.cardTransaction.dto.CardTransactionListResponseDto;
import elevenjo.ssdam.domain.cardTransaction.dto.DepositAccountTransferResponseDto;
import elevenjo.ssdam.domain.cardTransaction.dto.MonthlyPaymentResponseDto;
import elevenjo.ssdam.domain.cardTransaction.dto.OccurredCardTransactionRequestDto;
import elevenjo.ssdam.domain.cardTransaction.service.CardTransactionService;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CardTransactionController {

    private final CardTransactionService cardTransactionService;

    @PostMapping("/card-transactions")
    public ResponseEntity<ResponseWrapper<DepositAccountTransferResponseDto>> postCardTransaction(
            @RequestBody OccurredCardTransactionRequestDto requestDto
    ) {
        log.info("이체 정보 전달 "+requestDto.userKey()+" "+requestDto.merchantName()+" "+requestDto.paymentBalance());
        DepositAccountTransferResponseDto responseDto = cardTransactionService.occurredCardTransaction(requestDto);
        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, responseDto);
    }

    @GetMapping("/card-transactions")
    public ResponseEntity<ResponseWrapper<CardTransactionListResponseDto>> getCardTransactions(
        @RequestParam(value = "start_date") String startDate,
        @RequestParam(value = "end_date") String endDate,
        @AuthenticationPrincipal User user
    ) {
        CardTransactionListResponseDto responseDto =
            cardTransactionService.inquireCardTransactions(startDate, endDate, user);

        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, responseDto);
    }

    @GetMapping("/card-transactions/this-month")
    public ResponseEntity<ResponseWrapper<MonthlyPaymentResponseDto>> getThisMonthPayment(
        @AuthenticationPrincipal User user
    ) {
        MonthlyPaymentResponseDto responseDto = cardTransactionService.getThisMonthPayment(user);
        return ResponseWrapperFactory.setResponse(HttpStatus.OK, null, responseDto);
    }

}
