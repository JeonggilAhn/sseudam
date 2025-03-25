package elevenjo.ssdam.domain.user.handler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

import elevenjo.ssdam.global.exception.ExceptionCode;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;


@Configuration
public class PreAuthorizeExceptionHandler {

	@Bean
	public AuthenticationEntryPoint authenticationEntryPoint() {
		return (request, response, authException) -> {
			ResponseWrapperFactory.setResponse(
				response,
				ExceptionCode.METHOD_UNAUTHORIZED,
				null
			);
		};
	}

	@Bean
	AccessDeniedHandler accessDeniedHandler() {
		return (request, response, authException) -> {
			ResponseWrapperFactory.setResponse(
				response,
				ExceptionCode.METHOD_FORBIDDEN,
				null
			);
		};
	}
}
