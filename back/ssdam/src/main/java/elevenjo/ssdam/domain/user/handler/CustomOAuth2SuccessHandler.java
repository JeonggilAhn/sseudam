package elevenjo.ssdam.domain.user.handler;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import elevenjo.ssdam.domain.user.dto.CustomOAuth2User;
import elevenjo.ssdam.domain.user.entity.RefreshTokenEntity;
import elevenjo.ssdam.domain.user.repository.RefreshTokenRepository;
import elevenjo.ssdam.global.jwt.JwtUtil;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
	private final JwtUtil jwtUtil;
	private RefreshTokenRepository refreshTokenRepository;

	@Value("${login-endpoint}")
	private String loginSuccessEndpoint;

	@Autowired
	public CustomOAuth2SuccessHandler(JwtUtil jwtUtil, RefreshTokenRepository refreshTokenRepository) {
		this.jwtUtil = jwtUtil;
		this.refreshTokenRepository = refreshTokenRepository;
	}

	@Override
	public void onAuthenticationSuccess(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication
	) throws IOException, ServletException {
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		CustomOAuth2User customUser = (CustomOAuth2User) oAuth2User;

		String refreshToken = jwtUtil.generateToken(
			customUser.getUser(),
			10 * 60 * 60 * 1000L		// 나중에 시간 변경
		);

		// Redis에 refresh token 저장
		String nickname = customUser.getUser().getNickname();
		RefreshTokenEntity refreshTokenEntity = new RefreshTokenEntity(nickname, refreshToken);
		refreshTokenRepository.save(refreshTokenEntity);

		System.out.println(refreshToken);
		ResponseWrapperFactory.setResponse(HttpStatus.OK, null, refreshToken);
		Cookie cookie = new Cookie("refreshToken", refreshToken);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		response.addCookie(cookie);
		response.sendRedirect(loginSuccessEndpoint);
	}
}
