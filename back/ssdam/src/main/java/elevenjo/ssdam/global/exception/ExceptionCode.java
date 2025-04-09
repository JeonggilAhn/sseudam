package elevenjo.ssdam.global.exception;

import org.springframework.http.HttpStatus;

import elevenjo.ssdam.global.response.ResponseCode;


public enum ExceptionCode implements ResponseCode {
	// User
	INVALID_ACCESS_TOKEN("user-401-1", "올바르지 않은 토큰입니다", HttpStatus.UNAUTHORIZED),
	EXPIRED_ACCESS_TOKEN("user-401-2", "토큰의 유효기간이 만료되었습니다", HttpStatus.UNAUTHORIZED),
	REFRESH_TOKEN_NOT_FOUND("user-401-3", "리프레시 토큰이 없습니다", HttpStatus.UNAUTHORIZED),
	REFRESH_TOKEN_MISMATCH("user-401-4", "리프레시 토큰이 일치하지 않습니다", HttpStatus.UNAUTHORIZED),
	FAIL_TO_LOGIN("user-401-5", "로그인에 실패했습니다", HttpStatus.UNAUTHORIZED),
	METHOD_UNAUTHORIZED("user-401-6", "API에 접근하기 위해서 인증이 필요합니다", HttpStatus.UNAUTHORIZED),
	METHOD_FORBIDDEN("user-403-1", "API에 접근하기 위한 권한이 부족합니다", HttpStatus.FORBIDDEN),
	USER_NOT_FOUND("user-404-2", "해당 사용자를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
	USER_ALREADY_EXISTS("user-400-1", "이미 존재하는 사용자입니다", HttpStatus.BAD_REQUEST),

	// Card
	CARD_NOT_FOUND("card-401-1", "해당 카드를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
	CARD_USER_MISMATCH("card-401-2","일치하는 카드를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
	CARD_ALREADY_EXITSTS("card-401-3", "이미 등록된 카드입니다.", HttpStatus.BAD_REQUEST),
	CARD_REGISTER_FAIL("card-401-4","카드 등록에 실패하였습니다.", HttpStatus.BAD_REQUEST),

	// Saving
	SAVING_NOT_FOUND("saving-401-1", "해당 저축상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),

	// Coupon
	COUPON_NOT_FOUND("coupon-401-1", "해당 쿠폰을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
	COUPON_EXPIRED("coupon-401-2", "쿠폰의 유효기간이 만료되었습니다.", HttpStatus.BAD_REQUEST),
	COUPON_OUT_OF_STOCK("coupon-401-3", "쿠폰 재고가 부족합니다.", HttpStatus.BAD_REQUEST),
	COUPON_ALREADY_ISSUED("coupon-401-4", "해당 쿠폰은 이미 발급받았습니다.", HttpStatus.BAD_REQUEST),

	// Decrypt
	FAIL_TO_DECRYPT("decrypt-401-1", "복호화에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),

	FAIL_ON_EXTERNAL_API("external-400-1", "외부 api호출에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);

	private String code;
	private String message;
	private HttpStatus status;

	ExceptionCode(String code, String message, HttpStatus status) {
		this.code = code;
		this.message = message;
		this.status = status;
	}

	@Override
	public String getCode() {
		return this.code;
	}

	@Override
	public String getMessage() {
		return this.message;
	}

	@Override
	public HttpStatus getHttpStatus() {
		return this.status;
	}
}
