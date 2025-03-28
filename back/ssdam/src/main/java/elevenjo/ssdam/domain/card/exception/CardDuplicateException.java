package elevenjo.ssdam.domain.card.exception;

public class CardDuplicateException extends RuntimeException{
    public CardDuplicateException(){
        super("Card already exists");
    }
}
