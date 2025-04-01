package elevenjo.ssdam.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class QuizDto {
    String quest;
    String ans;
    String solution;
}
