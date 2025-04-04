package elevenjo.ssdam.domain.quiz.entity;

import elevenjo.ssdam.global.jpa.base.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @Column(nullable = false)
    private String quest;

    @Column(nullable = false)
    private String ans;

    @Column (nullable = false)
    private String solution;

    @Builder
    public Quiz(String quest, String ans, String solution) {
        this.quest = quest;
        this.ans = ans;
        this.solution = solution;
    }
}
