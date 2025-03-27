package elevenjo.ssdam.domain.saving.repository;

import elevenjo.ssdam.domain.saving.entity.Saving;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SavingRepository extends JpaRepository<Saving, Long> {

    // 1. 키워드 검색 + 페이징 (정렬은 Pageable로)
    Page<Saving> findByFinPrdtNmContainingIgnoreCase(String keyword, Pageable pageable);

    // 2. 조회수순 정렬
    Page<Saving> findAllByOrderByViewsDesc(Pageable pageable);

    // 3. 금리순 정렬
    Page<Saving> findAllByOrderByMaxIntRateDesc(Pageable pageable);

    // 4. 좋아요순 정렬 (JPQL로 커스텀)
    @Query("""
        SELECT s FROM Saving s
        LEFT JOIN LikeSaving l ON s = l.saving
        GROUP BY s
        ORDER BY COUNT(l) DESC
    """)
    Page<Saving> findAllOrderByLikes(Pageable pageable);
}
