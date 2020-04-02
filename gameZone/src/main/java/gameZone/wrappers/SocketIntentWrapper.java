package gameZone.wrappers;

import java.util.ArrayList;
import java.util.List;

public class SocketIntentWrapper {


    private int intent;

    private String payload;

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
    }

    /**
     * Constructs a {@code SocketIntentWrapper}
     * @param intent
     * 		Error {@code code} desired
     * @param payload
     * 		Payload {@code String} desired
     * @param exception
     * 		Return {@code GameZoneExceptionType} and {@code String} desired
     */
    public SocketIntentWrapper(int intent, String payload, ArrayList<ExceptionUpdateWrapper> exception) {

        this.setIntent(intent);
        this.setPayload(payload);
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
}
