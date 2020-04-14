package gameZone.components;

import gameZone.GameZone;
import gameZone.services.GameSessionService;
import gameZone.services.UserService;
import gameZone.wrappers.ObjectReturnWrapper;
import gameZone.wrappers.SocketIntentWrapper;
import gameZone.wrappers.SocketReturnWrapper;
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
    
    /* ************************************************* START INSTANCE VARIABLES ************************************************** */
    
    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Autowired
    private GlobalResources gRec;
    
    /**
     * {@code UserService} for this {@code ServerEndpoint}
     */
    @Autowired
    private UserService uService;
    
    @Autowired
    private GameSessionService gService;
    
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
    
    /* ************************************************** END INSTANCE VARIABLES *************************************************** */
    
    /* **************************************************** START CONSTRUCTORS ***************************************************** */
    
    /**
     * Default constructor
     */
    public WebSocketComponent() {

        this.gRec = null;
        this.uService = null;
        this.gService = null;
        
        log = LogFactory.getLog(GameZone.class);
        listeners = new HashMap<>();
    }
    
    /**
     * Constructs a WebSocketComponent with the following parameters:
     * @param gRec
     *      @see gameZone.components.GlobalResources GlobalResources
     * @param uService
     *      @see gameZone.services.UserService UserService
     * @param gService
     *      @see gameZone.services.GameSessionService GameSessionService
     */
    public WebSocketComponent(GlobalResources gRec, UserService uService, GameSessionService gService) {
        
        this();
        
        this.gRec = gRec;
        this.uService = uService;
        this.gService = gService;
    }
    
    /* ***************************************************** END CONSTRUCTORS ****************************************************** */
    
    /* ******************************************************* START ON OPEN ******************************************************* */
    
    
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
    
    /* ******************************************************** END ON OPEN ******************************************************** */
    
    /* ***************************************************** START ON MESSAGE ****************************************************** */
    
    @OnMessage
    public void socketMessage(Session socketSession, SocketIntentWrapper payloadWrap) {

        this.parseIntent(payloadWrap);
    }
    
    /* ****************************************************** END ON MESSAGE ******************************************************* */
    
    /* ****************************************************** START ON CLOSE ******************************************************* */
    
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
    
    /* ******************************************************** END ON CLOSE ******************************************************* */
    
    /* ****************************************************** START ON ERROR ******************************************************* */
    
    @OnError
    public void onError(Throwable t) { log.error("SOCKET: error: " + t.getMessage(), t); }
    
    /* ******************************************************** END ON ERROR ******************************************************* */
    
    /* *************************************************** START PRIVATE METHODS *************************************************** */
    
    private void whisperAll(SocketReturnWrapper wrap) {

        Set<Entry<String, Session>> listenSet = listeners.entrySet();
        Iterator<Entry<String, Session>> listenIter = listenSet.iterator();
        while(listenIter.hasNext()) { this.whisper(wrap, listenIter.next().getValue()); }
    }
    
    private void whisper(SocketReturnWrapper wrap, Session to) {

        try { to.getBasicRemote().sendObject(wrap); }
        catch(Exception e) { log.error("SOCKET: whisper exception", e); }
    }

    private void parseIntent(SocketIntentWrapper intentWrap) {

        switch(intentWrap.getIntent()) {
            
            case 202:
                
                break;
            
            default :
                SocketReturnWrapper<String> echo = new SocketReturnWrapper(
                    201,
                    new ObjectReturnWrapper(200, new String("ECHO :[" + intentWrap.getPayload().toString() + "]"), null)
                );

                whisper(echo, listeners.get(intentWrap.getIdentifier()));
                break;
        }
    }
    
    /* **************************************************** END PRIVATE METHODS **************************************************** */
    
    /* ************************************************* END WEB SOCKET COMPONENT ************************************************** */
}
