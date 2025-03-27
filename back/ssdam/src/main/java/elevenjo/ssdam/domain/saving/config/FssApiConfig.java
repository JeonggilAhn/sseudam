package elevenjo.ssdam.domain.saving.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(FssApiProperties.class)
public class FssApiConfig {
    // 비워놔도 돼! 이 클래스의 목적은 FssApiProperties 등록이니까
}
