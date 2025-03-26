package elevenjo.ssdam.domain.card.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor

public class CardDto {
    private String cardNo;
    private String cvc;
    private long userId;
}
