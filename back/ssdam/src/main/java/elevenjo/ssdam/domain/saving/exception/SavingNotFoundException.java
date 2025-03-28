package elevenjo.ssdam.domain.saving.exception;

public class SavingNotFoundException extends RuntimeException {
    public SavingNotFoundException() {
        super("해당 적금 상품을 찾을 수 없습니다.");
    }
}
