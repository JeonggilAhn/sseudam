package elevenjo.ssdam.domain.user.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
//	private final UserRepository userRepository;
//
//	@Autowired
//	public UserService(UserRepository userRepository) {
//		this.userRepository = userRepository;
//	}
//
//	public UserDto user(Long id) {
//		User user =
//			userRepository.findById(id).orElseThrow(UserNotFoundException::new);
//
//		return new UserDto(
//			user.getUserId(),
//			user.getUserEmail(),
//			user.getProfileImage(),
//			user.getCreatedAt(),
//			user instanceof UnauthorizeUser
//		);
//	}
//
//	public void userResign(Long id) {
//		User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
//
//		user.setResign(true);
//		user.setResignDate(LocalDateTime.now());
//		userRepository.save(user);
//	}
}
