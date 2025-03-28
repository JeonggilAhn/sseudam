package elevenjo.ssdam.domain.saving.service;

import elevenjo.ssdam.domain.saving.entity.LikeSaving;
import elevenjo.ssdam.domain.saving.entity.Saving;
import elevenjo.ssdam.domain.saving.exception.SavingNotFoundException;
import elevenjo.ssdam.domain.saving.repository.LikeSavingRepository;
import elevenjo.ssdam.domain.saving.repository.SavingRepository;
import elevenjo.ssdam.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeSavingService {

    private final LikeSavingRepository likeSavingRepository;
    private final SavingRepository savingRepository;

    // 좋아요 토글 (이미 눌렀으면 해제, 아니면 추가)
    @Transactional
    public boolean toggleLike(User user, Long savingId) {
        Saving saving = savingRepository.findById(savingId)
                .orElseThrow(SavingNotFoundException::new);

        return likeSavingRepository.findByUserAndSaving(user, saving)
                .map(existingLike -> {
                    likeSavingRepository.delete(existingLike);
                    return false;
                })
                .orElseGet(() -> {
                    LikeSaving newLike = new LikeSaving(user, saving);
                    likeSavingRepository.save(newLike);
                    return true;
                });
    }

    // 특정 적금의 좋아요 수 조회
    @Transactional(readOnly = true)
    public Long countLikes(Long savingId) {
        Saving saving = savingRepository.findById(savingId)
                .orElseThrow(SavingNotFoundException::new);

        return likeSavingRepository.countBySaving(saving);
    }

    @Transactional(readOnly = true)
    public boolean isLikedByUser(User user, Long savingId) {
        Saving saving = savingRepository.findById(savingId)
                .orElseThrow(SavingNotFoundException::new);
        return likeSavingRepository.findByUserAndSaving(user, saving).isPresent();
    }


}
