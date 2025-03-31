package elevenjo.ssdam.domain.card.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CardDto {
    private String cardNo;
    private String cvc;
    private long userId;
    private String keyInfo;
}
