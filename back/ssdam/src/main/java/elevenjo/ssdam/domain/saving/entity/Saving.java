package elevenjo.ssdam.domain.saving.entity;

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
public class Saving extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long savingId;

    @Column(nullable = false)
    private String finCoNo;

    @Column(nullable = false)
    private String finCoNm;

    @Column(nullable = false)
    private String hompUrl;

    @Column(nullable = false)
    private String finPrdtCd;

    @Column(nullable = false)
    private String finPrdtNm;

    @Column(nullable = false)
    private String mtrtInt;

    @Column(nullable = false)
    private String spclCnd;

    @Column(nullable = false)
    private Integer joinDeny;

    @Column(nullable = false)
    private String joinMember;

    @Column(nullable = false)
    private String etcNote;

    @Column(nullable = false)
    private Integer maxLimit;

    @Column(nullable = false)
    private Integer maxIntRate;

    @Column(nullable = false)
    private Integer minIntRate;

    @Builder
    public Saving(String finCoNo, String finCoNm, String hompUrl, String finPrdtCd, String finPrdtNm,
                  String mtrtInt, String spclCnd, Integer joinDeny, String joinMember, String etcNote, Integer maxLimit,
                  Integer maxIntRate, Integer minIntRate) {
        this.finCoNo = finCoNo;
        this.finCoNm = finCoNm;
        this.hompUrl = hompUrl;
        this.finPrdtCd = finPrdtCd;
        this.finPrdtNm = finPrdtNm;
        this.mtrtInt = mtrtInt;
        this.spclCnd = spclCnd;
        this.joinDeny = joinDeny;
        this.joinMember = joinMember;
        this.etcNote = etcNote;
        this.maxLimit = maxLimit;
        this.maxIntRate = maxIntRate;
        this.minIntRate = minIntRate;
    }

}
