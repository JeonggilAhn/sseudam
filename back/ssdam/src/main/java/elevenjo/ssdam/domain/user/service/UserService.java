package elevenjo.ssdam.domain.user.service;

import elevenjo.ssdam.domain.user.dto.RegisterUserInfoRequestDto;
import elevenjo.ssdam.domain.user.dto.UpdateUserRequestDto;
import elevenjo.ssdam.domain.user.dto.UserDto;
import elevenjo.ssdam.domain.user.dto.external.SSAFYUserResponseDto;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.exception.UserNotFoundException;
import elevenjo.ssdam.domain.user.repository.UserRepository;
import elevenjo.ssdam.global.externalApi.ExternalApiUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final ExternalApiUtil ExternalApiUtil;

	@Value("${ssafy-api-key}")
	private String apiKey;

	@Autowired
	public UserService(
			UserRepository userRepository,
			ExternalApiUtil ExternalApiUtil
			) {
		this.userRepository = userRepository;
		this.ExternalApiUtil = ExternalApiUtil;
	}

	@Transactional(readOnly = true)
	public UserDto user(Long id) {

		User user =
			userRepository.findById(id).orElseThrow(UserNotFoundException::new);

		return UserDto.from(user);
	}

	@Transactional
	public UserDto registerUserInfo(Long userId, RegisterUserInfoRequestDto requestDto) {
		User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
		LocalDate birthdayDate = LocalDate.parse(requestDto.birthday(), DateTimeFormatter.ofPattern("yyyyMMdd"));
		LocalDateTime birthday = birthdayDate.atStartOfDay();

		String userKey;
		Map<String, Object> body = new HashMap<>();
		body.put("userId", user.getUserEmail());

		userKey = ExternalApiUtil.postWithBodyApiKey(
				"https://finopenapi.ssafy.io/ssafy/api/v1/member/search",
				body,
				SSAFYUserResponseDto.class).userKey();

		if(userKey == null) {
			userKey = ExternalApiUtil.postWithBodyApiKey(
					"https://finopenapi.ssafy.io/ssafy/api/v1/member",
					body,
					SSAFYUserResponseDto.class
			).userKey();
		}

		user.registerUserInfo(
				requestDto.userName(),
				birthday,
				requestDto.withdrawAccountNo(),
				requestDto.savingRate(),
				userKey
		);


		return UserDto.from(user);
	}

	@Transactional
	public UserDto updateUser(Long userId, UpdateUserRequestDto requestDto) {
		User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

		user.updateUserInfo(
				requestDto.withdrawAccountNo(),
				requestDto.savingRate()
		);

		return UserDto.from(user);
	}

}
