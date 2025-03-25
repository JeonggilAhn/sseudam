package elevenjo.ssdam.global.filter;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import elevenjo.ssdam.global.exception.BaseRuntimeException;
import elevenjo.ssdam.global.exception.CustomException;
import elevenjo.ssdam.global.exception.ExceptionCode;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class ExceptionHandlingFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(
		HttpServletRequest request,
		HttpServletResponse response,
		FilterChain filterChain
	) throws ServletException, IOException {
		try {
			doFilter(request, response, filterChain);
		} catch (BaseRuntimeException e) {
			CustomException customException = e.getClass().getAnnotation(CustomException.class);

			ExceptionCode exceptionCode = customException.value();

			ResponseWrapperFactory.setResponse(
				response,
				exceptionCode,
				null
			);
		}
	}
}
