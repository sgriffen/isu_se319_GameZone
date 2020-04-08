package gameZone.wrappers;

import gameZone.exceptions.GameZoneException;

import java.util.ArrayList;
import java.util.List;

/**
 * A common format to package an execution status, message, and an object to return to the frontend
 * <br>
 * Used primarily to make error catching and response the same across all frontend javascript
 *
 * @param <T>
 * 		Object {@code Type} of the payload being returned to the frontend
 */
public class ObjectReturnWrapper<T> {

    /**
     * HTTP Execution status number. Used for error detection in the frontend javascript
     * <br>
     * <ul>
     * 		<li>{@code status >= 200 && status < 300}: Backend code executed and returned correctly</li>
     * 		<li>{@code status >= 500 && status < 550}: Backend code executed and a {@code GameZoneException} was thrown</li>
     * 		<li>{@code status >= 550 && status < 555}: Backend code executed and an {@code Exception} (not a {@code GameZoneException}) was thrown</li>
     * </ul>
     */
    private int status;
    /**
     * {@code Object} to return to the frontend
     * <br>
     * May be as simple as a {@code String} message or as complicated as a {@code List<ExceptionUpdateWrapper>}
     */
    private T payload;
    /**
     * See {@code ExceptionUpdateWrapper}
     * <br>
     * Used to send {@code Exception} info to the frontend if any
     */
    private List<ExceptionUpdateWrapper> exceptions;

    /**
     * Default constructor
     *
     * @deprecated
     * 		Advisable to define an error {@code status}, a return {@code payload} and a return {@code message} on creation.
     * 		<br>
     * 		These can be set after creation, but this object should be created and then immediately returned by the function using this class.
     */
    @Deprecated
    public ObjectReturnWrapper() {

        status = 200;
        payload = null;
        exceptions = null;
    }

    /**
     * Constructs a {@code ObjectReturnWrapper}
     * @param status
     * 		Error {@code short} desired
     * @param payload
     * 		Return {@code T} desired
     * @param exception
     * 		Return {@code GameZoneExceptionType} and {@code String} desired
     */
    public ObjectReturnWrapper(int status, T payload, ArrayList<ExceptionUpdateWrapper> exception) {

        this.setStatus(status);
        this.setPayload(payload);
        this.setException(exception);
    }

    /**
     * Get the error {@code status} of {@code ObjectReturnWrapper}
     * @return
     * 		{@code status}
     */
    public int getStatus() { return status; }
    /**
     * Set {@code status} of {@code ObjectReturnWrapper}
     * @param status
     * 		Desired error {@code status} for {@code ObjectReturnWrapper}
     */
    public void setStatus(int status) { this.status = status; }

    /**
     * Get the {@code payload} of {@code ObjectReturnWrapper}
     * @return
     * 		{@code payload}
     */
    public T getPayload() { return payload; }
    /**
     * Set {@code payload} of {@code ObjectReturnWrapper}
     * @param payload
     * 		Desired {@code payload} for {@code ObjectReturnWrapper}
     */
    public void setPayload(T payload) { this.payload = payload; }

    /**
     * Get {@code exception} of {@code ObjectReturnWrapper}
     * @return
     * 		{@code exception}
     */
    public List<ExceptionUpdateWrapper> getException() { return exceptions; }
    /**
     * Set {@code exception} of {@code ObjectReturnWrapper}
     * @param exceptions
     * 		Desired {@code exception} for {@code ObjectReturnWrapper}
     */
    public void setException(ArrayList<ExceptionUpdateWrapper> exceptions) { this.exceptions = exceptions; }
}
