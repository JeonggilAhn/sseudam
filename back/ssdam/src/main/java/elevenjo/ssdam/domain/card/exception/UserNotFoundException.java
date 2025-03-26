package elevenjo.ssdam.domain.card.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(){
        super("User not Found");
    }
}
