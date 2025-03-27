package elevenjo.ssdam.domain.user.entity;

import java.time.LocalDateTime;

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
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 유저 이름 : 실제 이름
    private String userName;

    // 유저 닉네임 (userEmail@gamil.com -> userEmail)
    @Column(unique = true)
    private String nickname;

    @Column(unique = true)
    private String userEmail;

    private LocalDateTime birthday;

    // 출금 계좌번호
    private String withdrawAccountNo;

    // 입금 계좌번호(수시입출금계좌)
    private String piggyAccountNo;

    private Integer savingRate;

    private String oauthProvider;

    private Boolean resigned;

    private LocalDateTime resignedAt;

    private String userKey;

    @Builder
    public User(
        String userName,
        String userEmail,
        String nickname,
        LocalDateTime birthday,
        String oauthProvider
    ) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.nickname = nickname;
        this.birthday = birthday;
        this.savingRate = 0;
        this.oauthProvider = oauthProvider;
        this.resigned = false;
    }

    public void registerWithdrawAccountNo(String withdrawAccountNo) {
        this.withdrawAccountNo = withdrawAccountNo;
    }

    public void registerPiggyAccountNo(String piggyAccountNo) {
        this.piggyAccountNo = piggyAccountNo;
    }

    public void changeSavingRate(int savingRate) {
        this.savingRate = savingRate;
    }

    public void resign() {
        this.resigned = true;
        this.resignedAt = LocalDateTime.now();
    }

}
