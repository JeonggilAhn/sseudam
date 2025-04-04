package elevenjo.ssdam.domain.cardTransaction.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import elevenjo.ssdam.global.decrypt.HybridDecryptor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.card.exception.CardNotFoundException;
import elevenjo.ssdam.domain.card.repository.CardRepository;
import elevenjo.ssdam.domain.cardTransaction.dto.CardTransactionListResponseDto;
import elevenjo.ssdam.domain.cardTransaction.dto.DepositAccountTransferResponseDto;
import elevenjo.ssdam.domain.cardTransaction.dto.InquireCreditCardTransactionListRequestDto;
import elevenjo.ssdam.domain.cardTransaction.dto.InquireCreditCardTransactionListResponseDto;
import elevenjo.ssdam.domain.cardTransaction.dto.MonthlyPaymentResponseDto;
import elevenjo.ssdam.domain.cardTransaction.dto.OccurredCardTransactionRequestDto;
import elevenjo.ssdam.domain.ssafyApi.dto.HeaderRequestDto;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import elevenjo.ssdam.global.externalApi.ExternalApiUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CardTransactionService {

    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final ExternalApiUtil externalApiUtil;
    private final HybridDecryptor hybridDecryptor;

    private static final String EXTERNAL_API_URL =
            "https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/inquireCreditCardTransactionList";
    private static final String API_NAME = "inquireCreditCardTransactionList";

    public DepositAccountTransferResponseDto occurredCardTransaction(OccurredCardTransactionRequestDto requestDto) {

        User user = userRepository.getUserByUserKey(requestDto.userKey());
        String transactionBalance = Double.toString(Math.ceil(requestDto.paymentBalance() * (user.getSavingRate() / 100.0)));
        String summary = new StringBuilder()
                .append("쓰담 : ")
                .append(requestDto.merchantName()).append(" ")
                .append(requestDto.paymentBalance()).append("원")
                .toString();

        Map<String, String> map = new HashMap<>();
        map.put("depositAccountNo",user.getPiggyAccountNo());
        map.put("depositTransactionSummary",summary);
        map.put("transactionBalance",transactionBalance);
        map.put("withdrawalAccountNo", user.getWithdrawAccountNo());
        map.put("withdrawalTransactionSummary",summary);

        String apiUri = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit/updateDemandDepositAccountTransfer";
        String apiName = "updateDemandDepositAccountTransfer";

        DepositAccountTransferResponseDto responseDto = externalApiUtil.postWithHeader(
                apiUri, apiName, user.getUserKey(),
                map, DepositAccountTransferResponseDto.class
        );

        return responseDto;
    }

    public CardTransactionListResponseDto inquireCardTransactions(
            String startDate,
            String endDate,
            User user
    ) throws Exception {

        Card card = cardRepository.findByUserId(user.getUserId()).orElseThrow(CardNotFoundException::new);


        HybridDecryptor.AESKeyInfo keyInfo = hybridDecryptor.decryptKeyInfo(card.getKeyInfo());

        String decryptedCardNo = hybridDecryptor.decryptWithAES(card.getCardNo(), keyInfo);
        String decryptedCvc = hybridDecryptor.decryptWithAES(card.getCvc(), keyInfo);


        HeaderRequestDto headerRequestDto = HeaderRequestDto.from(API_NAME, user.getUserKey());

        InquireCreditCardTransactionListRequestDto externalRequest =
                InquireCreditCardTransactionListRequestDto.from(
                        headerRequestDto,
                        decryptedCardNo,
                        decryptedCvc,
                        startDate,
                        endDate
                );

        RestTemplate restTemplate = new RestTemplate();
        InquireCreditCardTransactionListResponseDto externalResponse =
                restTemplate.postForObject(
                        EXTERNAL_API_URL,
                        externalRequest,
                        InquireCreditCardTransactionListResponseDto.class
                );

        // 외부 API 응답 검증 (응답 코드가 H0000 이외면 에러 처리)
        if (externalResponse == null
                || externalResponse.header() == null
                || !"H0000".equals(externalResponse.header().responseCode())) {
            throw new RuntimeException("Failed to fetch card transactions from external API");
        }

        // 외부 API 응답에서 거래내역 추출
        List<InquireCreditCardTransactionListResponseDto.Rec.TransactionDetail> transactionList
                = externalResponse.rec().transactionList();

        return new CardTransactionListResponseDto(
                externalResponse.rec().cardIssuerName(),
                externalResponse.rec().cardName(),
                externalResponse.rec().cardNo(),
                externalResponse.rec().transactionList().stream()
                        .map(t -> new CardTransactionListResponseDto.TransactionDetail(
                                t.categoryName(),
                                t.merchantName(),
                                t.transactionDate(),
                                t.transactionTime(),
                                t.transactionBalance()
                        ))
                        .collect(Collectors.toList())
        );
    }

    public MonthlyPaymentResponseDto getThisMonthPayment(User user) throws Exception {
        LocalDate now = LocalDate.now();
        // 'yyyyMMdd' 포맷으로 변환
        String startDate = now.withDayOfMonth(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String endDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        // 이번 달의 거래 내역 조회
        CardTransactionListResponseDto transactionListResponseDto =
                inquireCardTransactions(startDate, endDate, user);

        // 결제 금액 합산
        long totalPayment = transactionListResponseDto.transactionList().stream()
                // transactionBalance가 String 형태이므로 long으로 변환
                .mapToLong(t -> Long.parseLong(t.transactionBalance()))
                .sum();

        return new MonthlyPaymentResponseDto(totalPayment);
    }
}
