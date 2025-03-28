package elevenjo.ssdam.domain.payment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import elevenjo.ssdam.domain.payment.dto.CardTransactionDto;
import elevenjo.ssdam.domain.payment.dto.PaymentDto;
import elevenjo.ssdam.global.externalApi.dto.ApiRequest;
import elevenjo.ssdam.global.externalApi.dto.HeaderRequestDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PaymentService {

    @Value("${SSAFY_API_KEY}")
    private String ssafyApiKey;

    private final WebClient ssafyWebClient;
    private final WebClient transactionWebClient;


    @Autowired
    public PaymentService(WebClient ssafyWebClient, WebClient transactionWdbClient) {
        this.ssafyWebClient = ssafyWebClient;
        this.transactionWebClient = transactionWdbClient;
    }

    @Async
    public void generatePayment(String cardNo, String cvc, String userKey) {
        String currentStep = "";
        try{
            currentStep = "SSAFY";
            String merchantId = Integer.toString((int) (Math.random() * 21 + 4218));
            Integer paymentBalance = (int) (Math.random() * 100001 + 1);

            ApiRequest apiRequest = new ApiRequest(HeaderRequestDto.from(
                "createCreditCardTransaction",
                    userKey,
                    ssafyApiKey
            ));
            apiRequest.addField("cardNo", cardNo);
            apiRequest.addField("cvc", cvc);
            apiRequest.addField("merchantId", merchantId);
            apiRequest.addField("paymentBalance", paymentBalance.toString());

            PaymentDto paymentDto = ssafyWebClient.post()
                    .bodyValue(apiRequest)
                    .retrieve()
                    .bodyToMono(PaymentDto.class)
                    .block();

            currentStep = "SSDAM";
            CardTransactionDto cardTransactionDto = new CardTransactionDto(userKey, paymentDto.rec().merchantName(), paymentBalance);
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
