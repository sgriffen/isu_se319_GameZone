package gameZone.components;

import gameZone.GameZone;
import gameZone.services.GameSessionService;
import gameZone.services.UserService;
import gameZone.user.User;
import gameZone.user.UserInterface;
import gameZone.wrappers.ObjectReturnWrapper;
import gameZone.wrappers.SocketIntentWrapper;
import gameZone.wrappers.SocketReturnWrapper;
import gameZone.wrappers.StringIntegerWrapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
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
    
    private List<StringIntegerWrapper> pendingGameList;
    
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
        pendingGame = new ArrayList<>();
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

        log.debug("SOCKET: client attempting to open new connection");
        UserInterface u = uService.getUser(payload);

        //temporary for testing
        if (u != null) {

            listeners.put(u.getIdApp(), socketSession);
            log.debug("SOCKET: client successfully opened connection");
    
            SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<>(
                    200,
                    new ObjectReturnWrapper<String>(200, new String("Socket established"), null)
            );
            whisper(intentReturn, socketSession);
        } else {
            
            log.debug("SOCKET: client invalid for connection");
    
            SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<>(
                    200,
                    new ObjectReturnWrapper<String>(500, new String("Socket invalid"), null)
            );
            whisper(intentReturn, socketSession);
        }
    }
    
    /* ******************************************************** END ON OPEN ******************************************************** */
    
    /* ***************************************************** START ON MESSAGE ****************************************************** */
    
    @OnMessage
    public void socketMessage(Session socketSession, SocketIntentWrapper payloadWrap) {

        this.parseIntent(socketSession, payloadWrap);
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

        log.debug("SOCKET: client closed connection");
    }
    
    /* ******************************************************** END ON CLOSE ******************************************************* */
    
    /* ****************************************************** START ON ERROR ******************************************************* */
    
    @OnError
    public void onError(Throwable t) { log.error("SOCKET: error: " + t.getMessage(), t); }
    
    /* ******************************************************** END ON ERROR ******************************************************* */
    
    /* *************************************************** START PRIVATE METHODS *************************************************** */
    
    private <T> void whisperAll(SocketReturnWrapper<T> wrap) {

        Set<Entry<String, Session>> listenSet = listeners.entrySet();
        Iterator<Entry<String, Session>> listenIter = listenSet.iterator();
        while(listenIter.hasNext()) { this.whisper(wrap, listenIter.next().getValue()); }
    }
    
    private <T> void whisper(SocketReturnWrapper<T> wrap, Session to) {

        try { to.getBasicRemote().sendObject(wrap); }
        catch(Exception e) { log.error("SOCKET: whisper exception", e); }
    }

    private void parseIntent(Session whisperBackSession, SocketIntentWrapper<StringIntegerWrapper> intentWrap) {

        switch(intentWrap.getIntent()) {
            
            case 202 : //user wants to start game
                pendGame(whisperBackSession, intentWrap.getPayload());
                break;
            case 203 : //user accepts or declines game
                startGame(whisperBackSession, intentWrap.getPayload());
                break;
            default : //echo intent payload
                echoIntent(whisperBackSession, intentWrap.getPayload().toString(), intentWrap.getIdentifier());
                break;
        }
    }
    
    private void echoIntent(Session whisperBackSession, String toEcho, String echoTo) {
    
        SocketReturnWrapper<String> echo = new SocketReturnWrapper<String>(
                201,
                new ObjectReturnWrapper<String>(200, new String("ECHO :[" + toEcho + "]"), null)
        );
    
        whisper(echo, whisperBackSession);
    }
    
    private void pendGame(Session whisperBackSession, StringIntegerWrapper wrapper) {
        
        String id1 = wrapper.getStrings().get(0);
        String id2 = wrapper.getStrings().get(1);
        
        UserInterface requester = uService.getUser(id1);
        if (requester != null) { //if requester valid
            
            if (!id2.toUpperCase().equals("AI")) {
    
                UserInterface requested = uService.getUser(id2);
                if (requested != null || listeners.get(requested.getIdApp()) != null) { //if requested valid
                    
                    //get session of requested
                    Session requestedSession = listeners.get(requested.getIdApp());
                    //store game request info
                    pendingGameList.add(wrapper);
                    //whisper request to requested
                    ArrayList<String> ids = new ArrayList<>();
                    ids.add(id1);
                    SocketReturnWrapper<String> requestGameIntent = new SocketReturnWrapper<String>(
            
                            202,
                            new ObjectReturnWrapper<StringIntegerWrapper>(200, new StringIntegerWrapper(ids, wrapper.getInteger()), null)
                    );
                    whisper(requestGameIntent, requestedSession);
                } else {
    
                    SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
            
                            202,
                            new ObjectReturnWrapper<String>(550, new String("Competing user with ID [" + id2 + "] not found"), null)
                    );
                    whisper(intentReturn, whisperBackSession);
                }
            } else {
        
            
            }
        } else {
    
            SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
        
                    202,
                    new ObjectReturnWrapper<String>(550, new String("Invalid user ID [" + id1 + "] entered"), null)
            );
            whisper(intentReturn, whisperBackSession);
        }
    }
    
    private void startGame(Session whisperBackSession, StringIntegerWrapper wrapper) {
    
        String id1 = wrapper.getStrings().get(0);
        String id2 = wrapper.getStrings().get(1);
    
        UserInterface requested = uService.getUser(id1);
        if (requested != null) { //if original requested valid
    
            UserInterface requester = uService.getUser(id2);
            if (requester != null || listeners.get(requester.getIdApp()) != null) { //if original requester valid
    
                Session requesterSession = listeners.get(requested.getIdApp());
                if (wrapper.getInteger() == 0) { //requested user declined, send notification to requester
                    
                    SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
                            
                            203,
                            new ObjectReturnWrapper<Integer>(550, 0, null)
                    );
                    whisper(intentReturn, requesterSession);
                } else { //requested user accepted, start game
                    
                    StringIntegerWrapper pendingGame = null;
                    for (StringIntegerWrapper s : pendingGameList) {
                    
                        if (s.getStrings().get(0).equals(id2) && s.getStrings().get(1).equals(id1)) {
                            pendingGame = s;
                            break;
                        }
                    }
                    
                    if (pendingGame != null) { //game info entered correctly, start game
                        
                        //create game session
                        gService.generateGS((User) requester, (User) requested, pendingGame.getInteger());
                        
                        //send notification of started game to requester
                        SocketReturnWrapper<String> requesterReturn = new SocketReturnWrapper<String>(
            
                                203,
                                new ObjectReturnWrapper<Integer>(200, 1, null)
                        );
                        whisper(requesterReturn, requesterSession);
                        //send notification of started game to requester
                        SocketReturnWrapper<String> requestedReturn = new SocketReturnWrapper<String>(
            
                                203,
                                new ObjectReturnWrapper<Integer>(200, 1, null)
                        );
                        whisper(requestedReturn, requesterSession);
                    } else {
    
                        SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
            
                                203,
                                new ObjectReturnWrapper<String>(550, new String("Invalid game info received"), null)
                        );
                        whisper(intentReturn, whisperBackSession);
                    }
                }
            } else {
        
                SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
                
                        203,
                        new ObjectReturnWrapper<String>(550, new String("Competing user with ID [" + id2 + "] not found"), null)
                );
                whisper(intentReturn, whisperBackSession);
            }
        } else {
    
            SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
            
                    203,
                    new ObjectReturnWrapper<String>(550, new String("Invalid user ID [" + id1 + "] entered"), null)
            );
            whisper(intentReturn, whisperBackSession);
        }
    }
    
    /* **************************************************** END PRIVATE METHODS **************************************************** */
    
    /* ************************************************* END WEB SOCKET COMPONENT ************************************************** */
}
