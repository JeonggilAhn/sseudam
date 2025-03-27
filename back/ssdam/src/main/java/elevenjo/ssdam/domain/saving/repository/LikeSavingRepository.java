package elevenjo.ssdam.domain.saving.repository;

import elevenjo.ssdam.domain.saving.entity.LikeSaving;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeSavingRepository extends JpaRepository<LikeSaving, Long> {

    // 특정 유저가 특정 적금에 좋아요 눌렀는지 확인 (좋아요 토글에 필요)
    Optional<LikeSaving> findByUserAndSaving(User user, Saving saving);

    // 특정 적금 상품의 총 좋아요 수 조회
    Long countBySaving(Saving saving);
}
