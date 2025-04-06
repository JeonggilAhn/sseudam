package elevenjo.ssdam.domain.saving.repository;

import elevenjo.ssdam.domain.saving.entity.Saving;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SavingRepository extends JpaRepository<Saving, Long> {

    // 1. 조회수순 정렬
    Page<Saving> findAllByOrderByViewsDesc(Pageable pageable);

    // 2. 최대금리순 정렬
    Page<Saving> findAllByOrderByMaxIntRateDesc(Pageable pageable);

    // 3. 좋아요순 정렬 (native query)
    @Query(value = """
        SELECT s.*
        FROM saving s
        LEFT JOIN like_saving l ON s.saving_id = l.saving_id
        GROUP BY s.saving_id
        ORDER BY COUNT(l.like_saving_id) DESC
        """,
            countQuery = """
        SELECT COUNT(*) FROM (
            SELECT 1
            FROM saving s
            LEFT JOIN like_saving l ON s.saving_id = l.saving_id
            GROUP BY s.saving_id
        ) AS count_table
        """,
            nativeQuery = true)
    Page<Saving> findAllOrderByLikes(Pageable pageable);

    // 4. 키워드 검색 (공백 제거 + views 기준 정렬) 은행명 검색 간략화
    @Query(value = """
    SELECT *
    FROM saving s
    WHERE (
        INSTR(REPLACE(LOWER(s.fin_prdt_nm), ' ', ''), LOWER(:keywordNoSpace)) > 0
        OR INSTR(REPLACE(LOWER(s.fin_co_nm), ' ', ''), LOWER(:keywordNoSpace)) > 0
        OR INSTR(REPLACE(LOWER(s.etc_note), ' ', ''), LOWER(:keywordNoSpace)) > 0
        OR INSTR(REPLACE(LOWER(s.spcl_cnd), ' ', ''), LOWER(:keywordNoSpace)) > 0
    )
    ORDER BY s.views DESC
    """,
            countQuery = """
    SELECT COUNT(*)
    FROM saving s
    WHERE (
        INSTR(REPLACE(LOWER(s.fin_prdt_nm), ' ', ''), LOWER(:keywordNoSpace)) > 0
        OR INSTR(REPLACE(LOWER(s.fin_co_nm), ' ', ''), LOWER(:keywordNoSpace)) > 0
        OR INSTR(REPLACE(LOWER(s.etc_note), ' ', ''), LOWER(:keywordNoSpace)) > 0
        OR INSTR(REPLACE(LOWER(s.spcl_cnd), ' ', ''), LOWER(:keywordNoSpace)) > 0
    )
    """,
            nativeQuery = true)
    Page<Saving> searchByKeyword(
            @Param("keywordNoSpace") String keywordNoSpace,
            Pageable pageable
    );

}
