package elevenjo.ssdam.domain.piggy.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.List;

@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public record TransactionHistoryDto(
        String totalCount,
        List<TransactionRec> list
) {
    @JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
    public record TransactionRec(
            String transactionDate,
            String transactionTime,
            String transactionType,
            String transactionTypeName,
            String transactionBalance,
            String transactionAfterBalance,
            String transactionSummary
    ) {}
}


