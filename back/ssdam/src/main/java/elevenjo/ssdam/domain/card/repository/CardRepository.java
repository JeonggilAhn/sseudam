package elevenjo.ssdam.domain.card.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import elevenjo.ssdam.domain.card.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    @Query("""
        SELECT c FROM Card c where c.user.userId = :userId
    """)
    Optional<Card> findByUserId(Long userId);
}
