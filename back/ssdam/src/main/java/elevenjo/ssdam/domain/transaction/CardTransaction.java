package elevenjo.ssdam.domain.transaction;

import java.time.LocalDate;
import java.time.LocalTime;

import elevenjo.ssdam.domain.card.entity.Card;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CardTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CardTransactionId;

    private Long transactionId;

    private Integer categoryId;

    @Column(length = 100)
    private String categoryName;

    private Integer merchantId;

    @Column(length = 100)
    private String merchantName;

    private LocalDate transactionDate;

    private LocalTime transactionTime;

    private Long transactionBalance;

    @ManyToOne
    private Card card;

    @Builder
    public CardTransaction(Long transactionId,
                           Integer categoryId,
                           String categoryName,
                           Integer merchantId,
                           String merchantName,
                           LocalDate transactionDate,
                           LocalTime transactionTime,
                           Long transactionBalance,
                           Card card) {
        this.transactionId = transactionId;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.merchantId = merchantId;
        this.merchantName = merchantName;
        this.transactionDate = transactionDate;
        this.transactionTime = transactionTime;
        this.transactionBalance = transactionBalance;
        this.card = card;
    }

}
