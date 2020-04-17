package gameZone.components;

import gameZone.GameZone;
import gameZone.configurations.CustomConfigurator;
import gameZone.gameSession.GameSession;
import gameZone.services.GameSessionService;
import gameZone.services.UserService;
import gameZone.user.User;
import gameZone.user.UserInterface;
import gameZone.wrappers.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.net.Socket;
import java.util.*;
import java.util.Map.Entry;

@Component
@ServerEndpoint(value = "/websocket/{payload}", decoders = SocketDecoder.class, encoders = SocketEncoder.class, configurator = CustomConfigurator.class)
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
    
    /**
     * {@code GameSessionService} for this {@code ServerEndpoint}
     */
    @Autowired
    private GameSessionService gService;
    
    /**
     * {@code Map} of {@code User.id_apps} and {@code Sessions}. Associates a {@code User} to a {@code Session} where:
     * <br>
     * {@code K = User.id_app}, and {@code V = WebSocketComponent}
     */
    private Map<String, Session> listeners;
    
    private List<ArrayIntegerWrapper> pendingGameList;
    
    private List<String> startedGameList;
    
    /**
     * {@code Log} for this controller
     */
    private Log log;
    
    /* ************************************************** END INSTANCE VARIABLES *************************************************** */
    
    /* **************************************************** START CONSTRUCTORS ***************************************************** */
    
    public WebSocketComponent() {
    
        log = LogFactory.getLog(GameZone.class);
        listeners = new HashMap<>();
        pendingGameList = new ArrayList<>();
        startedGameList = new ArrayList<>();
    }
    
    /**
     * Constructs a WebSocketComponent with the following parameters:
     * @param gRec
     *      {@code GlobalResources} for this endpoint
     *      <br>
     *      @see gameZone.components.GlobalResources GlobalResources
     * @param uService
     *      {@code UserService} for this endpoint
     *       <br>
     *      @see gameZone.services.UserService UserService
     * @param gService
     *      {@code GameSessionService} for this endpoint
     *      <br>
     *      @see gameZone.services.GameSessionService GameSessionService
     */
    public WebSocketComponent(GlobalResources gRec, UserService uService, GameSessionService gService) {

        this.gRec = gRec;
        this.uService = uService;
        this.gService = gService;
    
        log = LogFactory.getLog(GameZone.class);
        listeners = new HashMap<>();
        pendingGameList = new ArrayList<>();
        startedGameList = new ArrayList<>();
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
            log.info("SOCKET: client [" + payload + "] successfully opened connection");
    
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
    public <T> void socketMessage(Session socketSession, SocketIntentWrapper<T> payloadWrap) {

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

        log.info("SOCKET: client [" + toClose + "]closed connection");
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

    private <T> void parseIntent(Session whisperBackSession, SocketIntentWrapper<T> intentWrap) {

        switch(intentWrap.getIntent()) {
            
            case 202 : //user wants to start game
                assert(intentWrap.getPayload() instanceof ArrayIntegerWrapper);
                pendGame(whisperBackSession, (ArrayIntegerWrapper<String>) intentWrap.getPayload(), intentWrap.getIdentifier());
                break;
            case 203 : //user accepts or declines game
                assert(intentWrap.getPayload() instanceof ArrayIntegerWrapper);
                startGame(whisperBackSession, (ArrayIntegerWrapper<String>) intentWrap.getPayload(), intentWrap.getIdentifier());
                break;
            case 204:
                assert(intentWrap.getPayload() instanceof ArrayIntegerWrapper);
                ArrayIntegerWrapper payload = (ArrayIntegerWrapper) ((ArrayIntegerWrapper) intentWrap.getPayload()).getArray();
                
                ArrayList<ArrayList<Integer>> array = (ArrayList<ArrayList<Integer>>) payload.getArray();
                Integer gameType = payload.getInteger();
    
                Integer arrayHeight = array.size();
                Integer arrayWidth = array.get(0).size();
    
                Integer[][] gameBoard = new Integer[arrayHeight][arrayWidth];
                for (int i = 0; i < arrayHeight; i++) {
                    for (int j = 0; j < arrayWidth; j++) { gameBoard[i][j] = array.get(i).get(j); }
                }
                gameMove(whisperBackSession, gameType, gameBoard, intentWrap.getIdentifier());
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
    
    private void pendGame(Session whisperBackSession, ArrayIntegerWrapper<String> wrapper, String id1) {
        
        String id2 = wrapper.getArray().get(0);
        
        UserInterface requester = uService.getUser(id1);
        if (requester != null) { //if requester valid
            
            if (!id2.toUpperCase().equals("AI")) { //send challenge request to desited player
    
                UserInterface requested = uService.getUser(id2);
                assert(requested != null);
                if (listeners.get(requested.getIdApp()) != null) { //if requested valid
                    
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
            } else { //start game with AI
    
                String gs_id = gService.generateGS((User) requester, null, wrapper.getInteger(), true);
                startedGameList.add(gs_id);
                
                SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<>(
                    
                    203,
                    new ObjectReturnWrapper<String>(200, gs_id, null)
                );
                whisper(intentReturn, whisperBackSession);
            }
        } else {
    
            SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
        
                    202,
                    new ObjectReturnWrapper<String>(550, new String("Invalid user ID [" + id1 + "] entered"), null)
            );
            whisper(intentReturn, whisperBackSession);
        }
    }
    
    private void startGame(Session whisperBackSession, ArrayIntegerWrapper<String> wrapper, String id1) {
        
        String id2 = wrapper.getArray().get(0);
    
        UserInterface requested = uService.getUser(id1);
        if (requested != null) { //if original requested valid
    
            UserInterface requester = uService.getUser(id2);
            assert(requester != null);
            if (listeners.get(requester.getIdApp()) != null) { //if original requester valid
    
                Session requesterSession = listeners.get(requested.getIdApp());
                if (wrapper.getInteger() == 0) { //requested user declined, send notification to requester
                    
                    SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
                            
                            203,
                            new ObjectReturnWrapper<String>(200, null, null)
                    );
                    whisper(intentReturn, requesterSession);
                } else { //requested user accepted, start game
    
                    ArrayIntegerWrapper pendingGame = null;
                    for (ArrayIntegerWrapper a : pendingGameList) {
                    
                        if (a.getArray().get(0).equals(id2) && a.getArray().get(1).equals(id1)) {
                            pendingGame = a;
                            break;
                        }
                    }
                    
                    if (pendingGame != null) { //game info entered correctly, start game
                        
                        //create game session
                        String gs_id = gService.generateGS((User) requester, (User) requested, pendingGame.getInteger(), false);
                        startedGameList.add(gs_id);
                        //send notification of started game to requester
                        SocketReturnWrapper<String> requesterReturn = new SocketReturnWrapper<String>(
            
                                203,
                                new ObjectReturnWrapper<String>(200, gs_id, null)
                        );
                        whisper(requesterReturn, requesterSession);
                        //send notification of started game to requester
                        SocketReturnWrapper<String> requestedReturn = new SocketReturnWrapper<String>(
            
                                203,
                                new ObjectReturnWrapper<String>(200, gs_id, null)
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
    
    private void gameMove(Session whisperBackSession, Integer game_type, Integer[][] gameBoard, String game_id) {
    
        GameSession gs = gService.getGameSession(game_id);
        if (gs != null) {
    
            ArrayList<ArrayList<Integer>> gameBoard_objectStyle = new ArrayList<>();
            switch(game_type) {
            
                case 0: //game is tic tac toe
                    if (!gs.getAi()) { gs.getTic().setBoard(gameBoard); }
                    else { gs.getTic().setBoard(gs.getTic().AImove(gameBoard)); }
                    
                    for (int i = 0; i < gameBoard.length; i++) {
                        ArrayList<Integer> gameRow_temp = new ArrayList<>();
                        for (int j = 0; j < gameBoard[0].length; j++) { gameRow_temp.add(gs.getTic().getBoard()[i][j]); }
                    }
                    break;
                case 1: //game is checkers
                    
                    break;
                case 2: //game is chess
                    
                    break;
                default: //game is ultimate tic tac toe
                    
                    break;
            }
            
            gService.saveGS_existing(gs);
            
            SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
            
                    204,
                    new ObjectReturnWrapper<ArrayList<ArrayList<Integer>>>(200, gameBoard_objectStyle, null)
            );
            whisper(intentReturn, whisperBackSession);
        } else {
    
            SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<String>(
            
                    204,
                    new ObjectReturnWrapper<String>(550, new String("Game Session with id [" + game_id + "] not found"), null)
            );
            whisper(intentReturn, whisperBackSession);
        }
    }
    
    /* **************************************************** END PRIVATE METHODS **************************************************** */
    
    /* ************************************************* END WEB SOCKET COMPONENT ************************************************** */
}
