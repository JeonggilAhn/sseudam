package elevenjo.ssdam.domain.card.controller;


import lombok.RequiredArgsConstructor;
import elevenjo.ssdam.domain.card.dto.CardDto;
import elevenjo.ssdam.domain.card.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class CardController {
    private final CardService cardService;

    @PostMapping("/card")
    public ResponseEntity<Void> registerCard(@RequestBody CardDto card){
       cardService.registUserCard(card);
       return ResponseEntity.ok().build();
    };

    @DeleteMapping("/cards")
    public ResponseEntity<Void> deleteCard(@RequestBody long cardId){
        cardService.deleteUserCard(cardId);
        return ResponseEntity.ok().build();
    };
}
