package elevenjo.ssdam.domain.piggy.service;

import elevenjo.ssdam.domain.piggy.dto.AccountResponseDto;
import elevenjo.ssdam.domain.piggy.dto.AccountTransactionRequestDto;
import elevenjo.ssdam.domain.piggy.dto.TransactionHistoryDto;
import elevenjo.ssdam.domain.piggy.dto.external.InquireAccountResponseDto;
import elevenjo.ssdam.domain.piggy.dto.external.InquireTransactionHistoryDto;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import elevenjo.ssdam.global.externalApi.ExternalApiUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        piggyAccountNo = externalAccount.rec().accountBalance();

        user.registerPiggyAccountNo(piggyAccountNo);

        return new AccountResponseDto(externalAccount.rec().accountBalance());
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


        return new AccountResponseDto(externalAccount.rec().accountBalance());
    }


    public TransactionHistoryDto getAccountTransactions(
            Long userId,
            AccountTransactionRequestDto requestDto
    ) {
        User user = userRepository.findById(userId).orElse(null);
        String piggyAccountNo = user.getPiggyAccountNo();
        String apiName = "inquireDemandDepositAccountTransactions";
        InquireTransactionHistoryDto historyDto = externalApiUtil.postWithHeader(
                externalBaseUrl + apiName,
                apiName,
                user.getUserKey(),
                requestDto,
                InquireTransactionHistoryDto.class
        );

        return historyDto.rec();
    }
}
