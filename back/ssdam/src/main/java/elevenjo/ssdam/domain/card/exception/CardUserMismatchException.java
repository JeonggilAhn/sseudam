package elevenjo.ssdam.domain.card.exception;


public class CardUserMismatchException extends RuntimeException {
    public CardUserMismatchException() {
        super("Card and user mismatch");
    }
}
