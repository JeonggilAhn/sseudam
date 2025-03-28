package elevenjo.ssdam.global.externalApi.dto;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class ApiRequest {
    @JsonProperty("Header") private HeaderRequestDto header;
    private Map<String, Object> additionalFields = new HashMap<>();

    public ApiRequest() {
    }

    public ApiRequest(HeaderRequestDto header) {
        this.header = header;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalFields() {
        return additionalFields;
    }

    @JsonAnySetter
    public void addField(String key, Object value) {
        this.additionalFields.put(key, value);
    }
}
