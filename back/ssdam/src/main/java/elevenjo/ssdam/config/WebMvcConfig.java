package elevenjo.ssdam.config;

import elevenjo.ssdam.global.interceptor.PasskeyInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	private final PasskeyInterceptor passkeyInterceptor;

	@Autowired
	public WebMvcConfig(PasskeyInterceptor passkeyInterceptor) {
		this.passkeyInterceptor = passkeyInterceptor;
	}

	@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {
		configurer.addPathPrefix("/api", c -> true);
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(passkeyInterceptor)
				.addPathPatterns("/**");  // 모든 요청에 대해 인터셉터 적용 (필요시 제외할 URL 지정 가능)
	}
}
