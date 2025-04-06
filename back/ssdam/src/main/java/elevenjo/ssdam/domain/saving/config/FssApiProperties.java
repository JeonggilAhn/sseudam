package elevenjo.ssdam.domain.saving.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "fss-api-key")
public class FssApiProperties {
    private String value;
}
