package elevenjo.ssdam.domain.saving.exception;

public class SavingExternalOpenNotAllowedException extends RuntimeException {
    public SavingExternalOpenNotAllowedException() {
        super("외부 링크 상품은 우리 플랫폼에서 개설할 수 없습니다.");
    }
}
