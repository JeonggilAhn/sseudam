package elevenjo.ssdam.domain.payment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.card.exception.CardNotFoundException;
import elevenjo.ssdam.domain.card.repository.CardRepository;
import elevenjo.ssdam.domain.payment.dto.CardTransactionDto;
import elevenjo.ssdam.domain.payment.dto.PaymentDto;
import elevenjo.ssdam.domain.payment.dto.PaymentUserDto;
import elevenjo.ssdam.domain.payment.exception.DecryptFailException;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.exception.UserNotFoundException;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import elevenjo.ssdam.global.decrypt.HybridDecryptor;
import elevenjo.ssdam.global.externalApi.dto.ApiRequest;
import elevenjo.ssdam.global.externalApi.dto.HeaderRequestDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PaymentService {

    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final HybridDecryptor hybridDecryptor;

    @Value("${SSAFY_API_KEY}")
    private String ssafyApiKey;

    private final WebClient ssafyWebClient;
    private final WebClient transactionWebClient;


    @Autowired
    public PaymentService(WebClient ssafyWebClient, WebClient transactionWdbClient,
                          UserRepository userRepository, CardRepository cardRepository,
                          HybridDecryptor hybridDecryptor) {
        this.ssafyWebClient = ssafyWebClient;
        this.transactionWebClient = transactionWdbClient;
        this.userRepository = userRepository;
        this.cardRepository = cardRepository;
        this.hybridDecryptor = hybridDecryptor;
    }

    public PaymentUserDto getPaymentUserInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Card card = cardRepository.findByUserId(userId).orElseThrow(CardNotFoundException::new);

        try {
            HybridDecryptor.AESKeyInfo keyInfo = hybridDecryptor.decryptKeyInfo(card.getKeyInfo());
            String cardNo = hybridDecryptor.decryptWithAES(card.getCardNo(), keyInfo);
            String cvc = hybridDecryptor.decryptWithAES(card.getCvc(), keyInfo);

            return PaymentUserDto.from(userId, user.getUserKey(), cardNo, cvc);

        } catch (Exception e) {
            throw new DecryptFailException();
        }
    }

    @Async
    public void generatePayment(PaymentUserDto paymentUserDto) {
        String currentStep = "";
        try{
            currentStep = "SSAFY";
            String merchantId = Integer.toString((int) (Math.random() * 21 + 4218));
            Integer paymentBalance = (int) (Math.random() * 100001 + 1);

            ApiRequest apiRequest = new ApiRequest(HeaderRequestDto.from(
                "createCreditCardTransaction",
                    paymentUserDto.userKey(),
                    ssafyApiKey
            ));
            apiRequest.addField("cardNo", paymentUserDto.cardNo());
            apiRequest.addField("cvc", paymentUserDto.cvc());
            apiRequest.addField("merchantId", merchantId);
            apiRequest.addField("paymentBalance", paymentBalance.toString());

            PaymentDto paymentDto = ssafyWebClient.post()
                    .bodyValue(apiRequest)
                    .retrieve()
                    .bodyToMono(PaymentDto.class)
                    .block();

            currentStep = "SSDAM";
            CardTransactionDto cardTransactionDto = new CardTransactionDto(paymentUserDto.userKey(), paymentDto.rec().merchantName(), paymentBalance);
            transactionWebClient.post()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(cardTransactionDto)
                    .retrieve()
                    .toBodilessEntity()
                    .block();

        } catch (WebClientResponseException e) {
            log.warn(currentStep+" API ERROR : " + e.getResponseBodyAsString());
        } catch (Exception e){
            log.warn(e.getMessage());
        }
    }


}
