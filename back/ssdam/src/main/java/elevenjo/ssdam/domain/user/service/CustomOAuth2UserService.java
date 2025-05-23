package elevenjo.ssdam.domain.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import elevenjo.ssdam.domain.user.dto.CustomOAuth2User;
import elevenjo.ssdam.domain.user.dto.oauthresponse.GoogleResponse;
import elevenjo.ssdam.domain.user.dto.oauthresponse.KakaoResponse;
import elevenjo.ssdam.domain.user.dto.oauthresponse.NaverResponse;
import elevenjo.ssdam.domain.user.dto.oauthresponse.OAuth2Response;
import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.domain.user.repository.UserRepository;


@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
	private final UserRepository userRepository;

	@Autowired
	public CustomOAuth2UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		// OAuth2 제공자에게 access token을 이용해 사용자 정보를 요청하고, 받아온 데이터를 OAuth2User 객체로 반환
		OAuth2User oAuth2User = super.loadUser(userRequest);

		// 소셜 타입별 사용자 응답 객체 매핑
		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		OAuth2Response oAuth2Response = switch (registrationId) {
			case "google" -> new GoogleResponse(oAuth2User.getAttributes());
			case "naver" -> new NaverResponse(oAuth2User.getAttributes());
			case "kakao" -> new KakaoResponse(oAuth2User.getAttributes());
			default -> null;
		};

		if (oAuth2Response == null) {
			return null;
		}

		String nickname = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
		User existUser = userRepository.getUserByNickname(nickname);//nickname

		// 가입 안되어 있으면 회원가입
		// username, birthday 등의 정보 추가로 받는 로직 필요
		if (existUser == null) {
			User user = User.builder()
				.nickname(nickname)
				.userEmail(oAuth2Response.getEmail())
				.oauthProvider(oAuth2Response.getProvider())
				.build();

			existUser = user;

			userRepository.save(existUser);
		}

		return new CustomOAuth2User(existUser);
	}
}
