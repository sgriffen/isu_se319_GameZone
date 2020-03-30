package gameZone.exceptions;

import gameZone.enums.GameZoneExceptionType;

/**
 * {@code Exception} type thrown by this application
 */
public class GameZoneException extends Exception {

    /**
     * Exception type for debugging purposes
     */
    private GameZoneExceptionType type;

    /**
     * Default constructor
     */
    public GameZoneException() { super(); }

    /**
     * Constructs a {@code GameZoneException} with {@code String} {@code message}
     * @param message
     * 		See {@code java.lang.Exception.Exception(String message)}
     */
    public GameZoneException(String message) { super(message); }

    /**
     * Get {@code type} of this {@code GameZoneException}
     * @return
     * 		{@code type}
     */
    public GameZoneExceptionType getType() { return type; }
    /**
     * Set {@code type} of this {@code GameZoneException}
     * @param type
     * 		Desired {@code type} for {@code GameZoneException}
     */
    public void setType(GameZoneExceptionType type) { this.type = type; }
}
