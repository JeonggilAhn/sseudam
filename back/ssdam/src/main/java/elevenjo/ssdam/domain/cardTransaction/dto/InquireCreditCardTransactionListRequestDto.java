package elevenjo.ssdam.domain.cardTransaction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import elevenjo.ssdam.domain.card.entity.Card;
import elevenjo.ssdam.domain.ssafyApi.dto.HeaderRequestDto;
import elevenjo.ssdam.global.decrypt.HybridDecryptor;


public record InquireCreditCardTransactionListRequestDto(
    @JsonProperty("Header")
    HeaderRequestDto headerRequestDto,
    String cardNo,
    String cvc,
    String startDate,
    String endDate
) {


    public static InquireCreditCardTransactionListRequestDto from(
        HeaderRequestDto headerRequestDto,
        Card card,
        String startDate,
        String endDate,
        HybridDecryptor hybridDecryptor
    ) throws Exception {
        HybridDecryptor.AESKeyInfo keyInfo = hybridDecryptor.decryptKeyInfo(card.getKeyInfo());

        return new InquireCreditCardTransactionListRequestDto(
            headerRequestDto,
                hybridDecryptor.decryptWithAES(card.getCardNo(), keyInfo),
                hybridDecryptor.decryptWithAES(card.getCvc(),keyInfo),
            startDate,
            endDate
        );
    }
}
