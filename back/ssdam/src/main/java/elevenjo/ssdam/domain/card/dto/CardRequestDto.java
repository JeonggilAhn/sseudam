package elevenjo.ssdam.domain.card.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CardRequestDto {
    private String cardUniqueNo;
    private String withdrawalAccountNo;
    private String withdrawalDate;
}
