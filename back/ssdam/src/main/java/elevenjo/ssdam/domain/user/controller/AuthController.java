package elevenjo.ssdam.domain.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import elevenjo.ssdam.domain.user.service.AuthService;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;


@RestController
public class AuthController {
	private final AuthService authService;

	@Autowired
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@GetMapping("/auth/issue")
	public ResponseEntity<ResponseWrapper<Void>> issue(
		@CookieValue("refreshToken") String token
	) {
		return ResponseWrapperFactory.setResponse(HttpStatus.OK,
			authService.setAccessToken(token));
	}
}
