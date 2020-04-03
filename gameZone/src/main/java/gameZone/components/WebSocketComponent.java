package gameZone.components;

import gameZone.GameZone;
import gameZone.services.UserService;
import gameZone.user.User;
import gameZone.user.UserInterface;
import gameZone.wrappers.ExceptionUpdateWrapper;
import gameZone.wrappers.SocketIntentWrapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.*;
import java.util.Map.Entry;

@Component
@ServerEndpoint(value = "/websocket/{payload}", decoders = SocketDecoder.class, encoders = SocketEncoder.class)
public class WebSocketComponent {

    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Autowired
    private GlobalResources gRec;

    /**
     * {@code Map} of {@code User.id_apps} and {@code Sessions}. Associates a {@code User} to a {@code Session} where:
     * <br>
     * {@code K = User.id_app}, and {@code V = WebSocketComponent}
     */
    private Map<String, Session> listeners;

    /**
     * {@code Log} for this controller
     */
    private Log log;

    /**
     * {@code UserService} for this {@code ServerEndpoint}
     */
    @Autowired
    private UserService uService;


    public WebSocketComponent() {

        this.gRec = null;
        this.uService = null;

        log = LogFactory.getLog(GameZone.class);
        listeners = new HashMap<>();
    }

    @OnOpen
    public void socketOpen(Session socketSession, @PathParam("payload") String payload) {

        log.info("SOCKET: client attempting to open new connection");
        //temporary for testing
        //UserInterface u = uService.getUser(payload);

        //temporary for testing
        if (payload != null) {

            listeners.put(payload, socketSession);
            log.info("SOCKET: client opened new connection");
        } else { log.info("SOCKET: client invalid for connection"); }
    }

    @OnMessage
    public void socketMessage(Session socketSession, SocketIntentWrapper payloadWrap) {

        this.parseIntent(payloadWrap);
    }

    @OnClose
    public void socketClose(Session socketSession) {

        String toClose = new String();

        Set<Entry<String, Session>> entrySet = listeners.entrySet();
        for (Entry<String, Session> entry : entrySet) {

            if (entry.getValue().equals(socketSession)) {

                toClose = entry.getKey();
                break;
            }
        }
        listeners.remove(toClose);

        log.info("SOCKET: client closed connection");
    }

    @OnError
    public void onError(Throwable t) { log.error("SOCKET: error: " + t.getMessage(), t); }

    private void whisperAll(SocketIntentWrapper wrap) {

        Set<Entry<String, Session>> listenSet = listeners.entrySet();
        Iterator<Entry<String, Session>> listenIter = listenSet.iterator();
        while(listenIter.hasNext()) { this.whisper(wrap, listenIter.next().getValue()); }
    }

    private void whisper(SocketIntentWrapper wrap, Session to) {

        try { to.getBasicRemote().sendObject(wrap); }
        catch(Exception e) { log.error("SOCKET: whisper exception", e); }
    }

    private void parseIntent(SocketIntentWrapper intentWrap) {

        switch(intentWrap.getIntent()) {

            default :
                SocketIntentWrapper echo = new SocketIntentWrapper(
                    201,
                    "ECHO: [" + intentWrap.getPayload() + "]",
                        "ECHO FROM: [" + intentWrap.getIdentifier() + "]"
                );

                whisper(echo, listeners.get(intentWrap.getIdentifier()));
                break;
        }
    }
}
