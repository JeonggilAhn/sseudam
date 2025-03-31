package elevenjo.ssdam.domain.card.repository;

import java.util.Optional;

import elevenjo.ssdam.domain.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import elevenjo.ssdam.domain.card.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    @Query("""
        SELECT c FROM Card c where c.user.userId = :userId
    """)
    Optional<Card> findByUserId(Long userId);
    boolean existsByCardNo(String cardNo);

    @Modifying
    @Query("""
    DELETE FROM Card c WHERE c.user.userId = :userId
    """)
    void deleteByUserId(@Param("userId") Long userId);
}
