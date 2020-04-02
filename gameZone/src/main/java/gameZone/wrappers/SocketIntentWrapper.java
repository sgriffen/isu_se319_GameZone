package gameZone.wrappers;

import java.util.ArrayList;
import java.util.List;

public class SocketIntentWrapper {


    private int intent;

    private String payload;

    private String identifier;
    /**
     * Default constructor
     *
     * @deprecated
     * 		Advisable to define an error {@code intent}, a return {@code payload} and a return {@code exception} on creation.
     * 		<br>
     * 		These can be set after creation, but this object should be created and then immediately returned by the function using this class.
     */
    @Deprecated
    public SocketIntentWrapper() {

        intent = 200;
        payload = null;
        identifier = null;
    }

    /**
     * Constructs a {@code SocketIntentWrapper}
     * @param intent
     * 		Error {@code code} desired
     * @param payload
     * 		Payload {@code String} desired
     * @param identifier
     * 		{@code User.id_app} desired
     */
    public SocketIntentWrapper(int intent, String payload, String identifier) {

        this.setIntent(intent);
        this.setPayload(payload);
        this.setIdentifier(identifier);
    }

    /**
     * Get the error {@code intent} of {@code SocketIntentWrapper}
     * @return
     * 		{@code intent}
     */
    public int getIntent() { return intent; }
    /**
     * Set {@code intent} of {@code SocketIntentWrapper}
     * @param intent
     * 		Desired error {@code intent} for {@code SocketIntentWrapper}
     */
    public void setIntent(int intent) { this.intent = intent; }

    /**
     * Get the {@code payload} of {@code SocketIntentWrapper}
     * @return
     * 		{@code payload}
     */
    public String getPayload() { return payload; }
    /**
     * Set {@code payload} of {@code SocketIntentWrapper}
     * @param payload
     * 		Desired {@code payload} for {@code SocketIntentWrapper}
     */
    public void setPayload(String payload) { this.payload = payload; }

    /**
     * Get the {@code identifier} of {@code SocketIntentWrapper}
     * @return
     * 		{@code identifier}
     */
    public String getIdentifier() { return identifier; }
    /**
     * Set {@code identifier} of {@code SocketIntentWrapper}
     * @param identifier
     * 		Desired {@code identifier} for {@code SocketIntentWrapper}
     */
    public void setIdentifier(String identifier) { this.identifier = identifier; }
}
