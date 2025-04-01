package elevenjo.ssdam.domain.quiz.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import elevenjo.ssdam.domain.quiz.dto.QuizDto;
import elevenjo.ssdam.domain.quiz.entity.Quiz;
import elevenjo.ssdam.domain.quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor

public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${cloud-run-url}")
    private String functionUrl;

    @Override
    public QuizDto getRandomQuiz() {
        Quiz quiz = quizRepository.findRandomRow();
        QuizDto tmpQuiz = new QuizDto();
        tmpQuiz.setAns(quiz.getAns());
        tmpQuiz.setSolution(quiz.getSolution());
        tmpQuiz.setQuest(quiz.getQuest());
        return tmpQuiz;

    }

    @Override
    public void AddQuizList() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("prompt","너는 경제 및 금융 상식 퀴즈를 만드는 전문가야.  \n" +
                "다음 조건을 만족하는 퀴즈들을 JSON 형식으로 만들어줘:\n" +
                "\n" +
                "- 형식: Java의 DTO 형식과 맞춰서, 각 퀴즈는 `quest`와 `ans`로 구성된 객체여야 해.\n" +
                "- 전체 결과는 List<QuizDto> 형태처럼 배열로 만들어줘.\n" +
                "- 퀴즈는 금융 상식이나 경제 용어, 투자 개념 등을 포함해야 하고, 퀴즈 형식은 OX퀴즈야.\n" +
                "틀렸을 경우 제공할 짧은 해설도 각 문제 마다 필요한데, 답이 O일 경우에는 앞에 '정답!'을 붙이고,"+
                "답이 X일 경우에는 '오답!'을 붙여야 해"+
                "- 답은 O와 X만 가능해.\n" +
                "반환하는 퀴즈는 50개여야 합니다."+
                "- 출력은 아래 형식을 지켜고, JSON만 해줘:\n" +
                "\n" +
                "```json\n" +
                "[\n" +
                "  { \"quest\": \"퀴즈 문제1\", \"ans\": \"정답1\", \"solution\": \"틀렸을 경우 짧은 해설1\" },\n" +
                "  { \"quest\": \"퀴즈 문제2\", \"ans\": \"정답2\", \"solution\": \"틀렸을 경우 짧은 해설2\" },\n" +
                "  ...\n" +
                "]");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(functionUrl, entity, String.class);
        String json = response.getBody();

        ObjectMapper mapper = new ObjectMapper();
        try{
            JsonNode root = objectMapper.readTree(json);
            String responseRaw = root.get("response").asText();
            String cleanedJson = responseRaw
                    .replaceAll("(?s)```json\\s*", "")  // 시작 부분 ```json
                    .replaceAll("(?s)```", "")          // 끝부분 ```
                    .trim();                            // 양쪽 공백 제거


            List<QuizDto> quizList = objectMapper.readValue(cleanedJson, new TypeReference<>() {
            });
            List<Quiz> quizEntities = quizList.stream()
                    .map(dto -> new Quiz(dto.getQuest(), dto.getAns(), dto.getSolution()))
                    .toList();


            long quizCount = quizRepository.count();
            if (quizCount >= 100){
                quizRepository.deleteAll();
            };
            quizRepository.saveAll(quizEntities);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}
