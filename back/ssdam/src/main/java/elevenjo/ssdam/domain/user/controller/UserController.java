package elevenjo.ssdam.domain.user.controller;

import elevenjo.ssdam.domain.user.dto.RegisterUserInfoRequestDto;
import elevenjo.ssdam.domain.user.dto.UpdateUserRequestDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import elevenjo.ssdam.domain.user.dto.UserDto;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.service.UserService;
import elevenjo.ssdam.global.response.ResponseWrapper;
import elevenjo.ssdam.global.response.ResponseWrapperFactory;

@RestController
@RequestMapping("/users")
public class UserController {
	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/me")
	public ResponseEntity<ResponseWrapper<UserDto>> getSelf(
		@AuthenticationPrincipal User user
	) {
		return ResponseWrapperFactory.setResponse(
			HttpStatus.OK,
			null,
			userService.user(user.getUserId())
		);
	}

	@PostMapping("/me")
	public ResponseEntity<ResponseWrapper<UserDto>> registerSelfInfo(
			@AuthenticationPrincipal User user,
			@Valid @RequestBody RegisterUserInfoRequestDto requestDto
	) {
		return ResponseWrapperFactory.setResponse(
				HttpStatus.OK,
				null,
				userService.registerUserInfo(user.getUserId(), requestDto)
		);
	}

	@PatchMapping("/me")
	public ResponseEntity<ResponseWrapper<UserDto>> updateSelf(
			@AuthenticationPrincipal User user,
			@Valid @RequestBody UpdateUserRequestDto requestDto
	) {
		return ResponseWrapperFactory.setResponse(
				HttpStatus.OK,
				null,
				userService.updateUser(user.getUserId(), requestDto)
		);
	}

//	@PreAuthorize("@authExpression.isSelf(#userId)")
//	@DeleteMapping("/users/{userId}")
//	public ResponseEntity<ResponseWrapper<Void>> deleteUser(
//		@PathVariable("userId") Long userId
//	) {
//		userService.userResign(userId);
//
//		return ResponseWrapperFactory.setResponse(
//			HttpStatus.OK,
//			null
//		);
//	}
}
