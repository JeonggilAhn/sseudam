package elevenjo.ssdam.domain.log.entity;

public enum TransferStatus {
    PENDING("전송 요청이 생성되었지만 아직 처리되지 않음"),
    IN_PROGRESS("데이터 전송 중"),
    SUCCESS("전송 완료"),
    FAILURE("전송 실패"),
    CANCELLED("사용자가 전송을 취소함"),
    RETRY("실패 후 다시 시도할 예정"),
    TIMEOUT("제한 시간 내에 전송이 완료되지 않음");

    private final String description;

    TransferStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
