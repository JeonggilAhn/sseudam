package elevenjo.ssdam.domain.cardTransaction.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.card.exception.CardNotFoundException;
import elevenjo.ssdam.domain.card.repository.CardRepository;
import elevenjo.ssdam.domain.cardTransaction.dto.CardTransactionListResponseDto;
import elevenjo.ssdam.domain.cardTransaction.dto.CardTransactionRequestDto;
import elevenjo.ssdam.domain.cardTransaction.dto.InquireCreditCardTransactionListRequestDto;
import elevenjo.ssdam.domain.cardTransaction.dto.InquireCreditCardTransactionListResponseDto;
import elevenjo.ssdam.domain.ssafyApi.dto.HeaderRequestDto;
import elevenjo.ssdam.domain.user.dto.UserDto;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CardTransactionService {

    private final UserRepository userRepository;
    private final CardRepository cardRepository;

    private static final String EXTERNAL_API_URL =
        "https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/inquireCreditCardTransactionList";
    private static final String API_NAME = "inquireCreditCardTransactionList";

    public CardTransactionListResponseDto inquireCardTransactions(
        String startDate,
        String endDate,
        User user
    ) {

        Card card = cardRepository.findByUserId(user.getId()).orElseThrow(CardNotFoundException::new);

        HeaderRequestDto headerRequestDto = HeaderRequestDto.from(API_NAME, user.getUserKey());

        InquireCreditCardTransactionListRequestDto externalRequest =
            InquireCreditCardTransactionListRequestDto.from(
                headerRequestDto,
                card,
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
}
