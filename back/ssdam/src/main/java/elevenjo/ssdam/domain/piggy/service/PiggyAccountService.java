package elevenjo.ssdam.domain.piggy.service;

import elevenjo.ssdam.domain.card.exception.UserNotFoundException;
import elevenjo.ssdam.domain.piggy.dto.AccountResponseDto;
import elevenjo.ssdam.domain.piggy.dto.AccountTransactionRequestDto;
import elevenjo.ssdam.domain.piggy.dto.TransactionHistoryDto;
import elevenjo.ssdam.domain.piggy.dto.WithdrawRequestDto;
import elevenjo.ssdam.domain.piggy.dto.WithdrawResponseDto;
import elevenjo.ssdam.domain.piggy.dto.external.InquireAccountResponseDto;
import elevenjo.ssdam.domain.piggy.dto.external.InquireTransactionHistoryRequestDto;
import elevenjo.ssdam.domain.piggy.dto.external.InquireTransactionHistoryResponseDto;
import elevenjo.ssdam.domain.piggy.dto.external.UpdateDemandDepositAccountTransferRequestDto;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import elevenjo.ssdam.global.externalApi.ExternalApiUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PiggyAccountService {
    private final ExternalApiUtil externalApiUtil;
    private final UserRepository userRepository;

    private final String externalBaseUrl = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit/";

    @Autowired
    public PiggyAccountService(ExternalApiUtil externalApiUtil, UserRepository userRepository) {
        this.externalApiUtil = externalApiUtil;
        this.userRepository = userRepository;
    }

    public AccountResponseDto createAccount(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        String piggyAccountNo = "";
        String apiName = "createDemandDepositAccount";

        InquireAccountResponseDto externalAccount = externalApiUtil.postWithHeader(
                externalBaseUrl + apiName,
                apiName,
                user.getUserKey(),
                Map.of("accountTypeUniqueNo", "001-1-3d2440839e314f"),
                InquireAccountResponseDto.class
                );
        piggyAccountNo = externalAccount.rec().accountNo();

        user.registerPiggyAccountNo(piggyAccountNo);

        userRepository.save(user);

        return new AccountResponseDto(0L);
    }

    public AccountResponseDto getAccountBalance(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        String piggyAccountNo = user.getPiggyAccountNo();
        String apiName = "inquireDemandDepositAccountBalance";

        InquireAccountResponseDto externalAccount = externalApiUtil.postWithHeader(
                externalBaseUrl + apiName,
                apiName,
                user.getUserKey(),
                Map.of("accountNo", piggyAccountNo),
                InquireAccountResponseDto.class
        );

        Long accountBalance = Long.parseLong(externalAccount.rec().accountBalance());

        return new AccountResponseDto(accountBalance);
    }


    public TransactionHistoryDto getAccountTransactions(
            Long userId,
            AccountTransactionRequestDto requestDto
    ) {
        User user = userRepository.findById(userId).orElse(null);
        String piggyAccountNo = user.getPiggyAccountNo();
        String apiName = "inquireTransactionHistoryList";

        InquireTransactionHistoryRequestDto request =
                new InquireTransactionHistoryRequestDto(
                        requestDto.startDate(),
                        requestDto.endDate(),
                        requestDto.transactionType(),
                        requestDto.orderByType(),
                        user.getPiggyAccountNo()
                );

        InquireTransactionHistoryResponseDto historyDto = externalApiUtil.postWithHeader(
                externalBaseUrl + apiName,
                apiName,
                user.getUserKey(),
                request,
                InquireTransactionHistoryResponseDto.class
        );

        TransactionHistoryDto result = historyDto.rec();
        if(result == null) {
            result = new TransactionHistoryDto("0", List.of());
        }

        return result;
    }

    public WithdrawResponseDto transfer(Long userId, WithdrawRequestDto requestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        String piggyAccountNo = user.getPiggyAccountNo();
        String apiName = "updateDemandDepositAccountTransfer";


        UpdateDemandDepositAccountTransferRequestDto request =
                new UpdateDemandDepositAccountTransferRequestDto(
                        requestDto.accountNo(),
                        "쓰담 : 입금",
                        requestDto.amount().toString(),
                        piggyAccountNo,
                        "쓰담 : 출금"
                );


        InquireTransactionHistoryResponseDto response =
                externalApiUtil.postWithHeader(
                        externalBaseUrl + apiName,
                        apiName,
                        user.getUserKey(),
                        request,
                        InquireTransactionHistoryResponseDto.class
                );


        return new WithdrawResponseDto(requestDto.amount());
    }
}
