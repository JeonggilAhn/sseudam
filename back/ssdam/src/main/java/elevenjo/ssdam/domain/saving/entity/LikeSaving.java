package elevenjo.ssdam.domain.saving.entity;

import elevenjo.ssdam.domain.user.entity.User;
import elevenjo.ssdam.global.jpa.base.BaseTimeEntity;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "like_saving",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "saving_id"})
    }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeSaving extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeSavingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saving_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Saving saving;

    public LikeSaving(User user, Saving saving) {
        this.user = user;
        this.saving = saving;
    }

}
