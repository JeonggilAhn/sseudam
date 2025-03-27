package elevenjo.ssdam.domain.saving.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(FssApiProperties.class)
public class FssApiConfig {
    // FssApiProperties 등록용
}
