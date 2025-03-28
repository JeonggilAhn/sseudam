package elevenjo.ssdam.domain.card.entity;

import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.jpa.base.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Card extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(length = 128,unique = true, nullable = false)
    private String cardNo;

    @Column(length = 128, nullable = false)
    private String cvc;

    @Column(length = 2048, nullable = false)
    private String keyInfo;

    @OneToOne
    private User user;

    @Builder
    public Card(String cardNo, String cvc, User user) {
        this.cardNo = cardNo;
        this.cvc = cvc;
        this.user = user;
    }


}
