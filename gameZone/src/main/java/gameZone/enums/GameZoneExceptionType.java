package gameZone.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum GameZoneExceptionType {

    @JsonProperty("SYSTEM")
    SYSTEM,
    @JsonProperty("FRONTEND")
    FRONTEND;
}
