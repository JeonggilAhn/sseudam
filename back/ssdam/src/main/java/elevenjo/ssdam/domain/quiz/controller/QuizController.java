package elevenjo.ssdam.domain.quiz.controller;

import elevenjo.ssdam.domain.quiz.dto.QuizDto;
import elevenjo.ssdam.domain.quiz.repository.QuizRepository;
import elevenjo.ssdam.domain.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/random")
    public ResponseEntity<QuizDto> randomQuiz(){
        QuizDto tmpQuiz = quizService.getRandomQuiz();
        return ResponseEntity.ok(tmpQuiz);
    };
}
