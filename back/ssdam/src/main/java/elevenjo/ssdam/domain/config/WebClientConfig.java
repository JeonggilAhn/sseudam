package elevenjo.ssdam.domain.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${CREATE_CARD_TRANSACTION_URL}")
    private String createCardTransactionUrl;

    @Bean
    public WebClient ssafyWebClient() {
        return WebClient.builder()
                .baseUrl(createCardTransactionUrl)
                .build();
    }

    @Bean
    public WebClient transactionWdbClient() {
        return WebClient.builder()
                .baseUrl("http://localhost:8080/api/card-transactions")
                .build();
    }
}
