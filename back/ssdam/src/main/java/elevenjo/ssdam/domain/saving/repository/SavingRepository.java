package elevenjo.ssdam.domain.saving.repository;

import elevenjo.ssdam.domain.saving.entity.Saving;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SavingRepository extends JpaRepository<Saving, Long> {

    // 1. 키워드 검색 + 페이징
    Page<Saving> findByFinPrdtNmContainingIgnoreCase(String keyword, Pageable pageable);

    // 2. 조회수순 정렬
    Page<Saving> findAllByOrderByViewsDesc(Pageable pageable);

    // 3. 금리순 정렬
    Page<Saving> findAllByOrderByMaxIntRateDesc(Pageable pageable);

    // 4. 좋아요순 정렬 (native query)
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
}