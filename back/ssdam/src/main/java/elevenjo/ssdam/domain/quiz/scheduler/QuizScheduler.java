package elevenjo.ssdam.domain.quiz.scheduler;

import elevenjo.ssdam.domain.quiz.repository.QuizRepository;
import elevenjo.ssdam.domain.quiz.service.QuizService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuizScheduler {
    private final QuizService quizService;
    private final QuizRepository quizRepository;

    @PostConstruct
    public void init() {
        long quizCount = quizRepository.count();



        try{
            if (quizCount < 5){
                quizService.AddQuizList();
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Scheduled(cron = "0 0 3 ? * MON")
    public void QuizScheduler() {
        quizService.AddQuizList();
    }
}
