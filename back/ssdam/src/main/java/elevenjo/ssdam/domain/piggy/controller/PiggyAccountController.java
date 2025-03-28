package elevenjo.ssdam.domain.piggy.controller;

import elevenjo.ssdam.domain.piggy.dto.AccountResponseDto;
import elevenjo.ssdam.domain.piggy.dto.AccountTransactionRequestDto;
import elevenjo.ssdam.domain.piggy.dto.TransactionHistoryDto;
import elevenjo.ssdam.domain.piggy.service.PiggyAccountService;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/accounts")
public class PiggyAccountController {
    private final PiggyAccountService piggyAccountService;

    @Autowired
    public PiggyAccountController(PiggyAccountService piggyAccountService) {
        this.piggyAccountService = piggyAccountService;
    }

    @PostMapping
    public ResponseEntity<ResponseWrapper<AccountResponseDto>> createAccount(
            @AuthenticationPrincipal User user
    ){
        return ResponseWrapperFactory.setResponse(
                HttpStatus.OK,
                null,
                piggyAccountService.createAccount(user.getUserId())
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ResponseWrapper<AccountResponseDto>> getAccountBalance(
            @AuthenticationPrincipal User user
    ) {
        return ResponseWrapperFactory.setResponse(
                HttpStatus.OK,
                null,
                piggyAccountService.getAccountBalance(user.getUserId())
        );
    }

    @GetMapping("/me/transaction")
    public ResponseEntity<ResponseWrapper<TransactionHistoryDto>> getAccountTransaction(
            @AuthenticationPrincipal User user,
            AccountTransactionRequestDto requestDto
    ) {
        return ResponseWrapperFactory.setResponse(
                HttpStatus.OK,
                null,
                piggyAccountService.getAccountTransactions(user.getUserId(),
                        requestDto)
        );
    }


}
