package elevenjo.ssdam.domain.saving.exception;

public class SavingAlreadyOpenedException extends RuntimeException {
    public SavingAlreadyOpenedException() {
        super("이미 개설된 적금 상품입니다.");
    }
}
