package elevenjo.ssdam.domain.quiz.repository;

import elevenjo.ssdam.domain.quiz.dto.QuizDto;
import elevenjo.ssdam.domain.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Quiz getQuizByQuizId(Long quizId);

    @Query(value = "SELECT * FROM quiz ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Quiz findRandomRow();

}
