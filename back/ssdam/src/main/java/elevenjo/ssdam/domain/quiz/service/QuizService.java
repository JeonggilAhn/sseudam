package elevenjo.ssdam.domain.quiz.service;

import elevenjo.ssdam.domain.quiz.dto.QuizDto;

import java.util.List;

public interface QuizService {
    QuizDto getRandomQuiz();
    void AddQuizList();
}
