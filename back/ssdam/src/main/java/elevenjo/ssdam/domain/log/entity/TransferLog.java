package elevenjo.ssdam.domain.log.entity;

import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.jpa.base.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TransferLog extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transferId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private User user;

    // 출금계좌
    @Column(nullable = false)
    private String fromAccount;

    // 입금계좌
    @Column(nullable = false)
    private String toAccount;

    // 이체금액
    @Column(nullable = false)
    private Long amount;

    // 상태
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TransferStatus transferStatus;

    // 오류메세지
    private String errorMessage;

    // 재시도 횟수
    private Integer retryCount;

    @Builder
    public TransferLog(User user, String fromAccount, String toAccount, Long amount,
                       String errorMessage, Integer retryCount) {
        this.user = user;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
        this.retryCount = 0;
    }
}
