package gameZone.components;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import gameZone.GameZone;
import gameZone.wrappers.SocketReturnWrapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class SocketEncoder implements Encoder.Text<SocketReturnWrapper> {

    /**
     * {@code Log} for this controller
     */
    private Log log = LogFactory.getLog(GameZone.class);

    /**
     * {@code ObjectMapper} for this {@code Encoder}
     */
    private static ObjectMapper mapper = new ObjectMapper();

    @Override
    public String encode(SocketReturnWrapper wrap) throws EncodeException {

        try { return mapper.writeValueAsString(wrap); }
        catch (JsonProcessingException e) { log.error("SOCKET: encode exception", e.getCause()); }

        return null;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
        //custom init
    }

    @Override
    public void destroy() {
        //close resources
    }
}
