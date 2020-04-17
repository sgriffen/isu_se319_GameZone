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
    private Map<String, Session> listeners_user;
    /**
     * {@code Map} of {@code User.id_apps} and {@code Sessions}. Associates a {@code User} to a {@code Session} where:
     * <br>
     * {@code K = User.id_app}, and {@code V = WebSocketComponent}
     */
    private Map<Session, String> listeners_session;
    
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
        listeners_user = new HashMap<>();
        listeners_session = new HashMap<>();
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

            listeners_user.put(u.getIdApp(), socketSession);
            listeners_session.put(socketSession, u.getIdApp());
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

        String toClose = listeners_session.get(socketSession);
        listeners_user.remove(toClose);
        listeners_session.remove(socketSession);

        log.info("SOCKET: client [" + toClose + "] closed connection");
    }
    
    /* ******************************************************** END ON CLOSE ******************************************************* */
    
    /* ****************************************************** START ON ERROR ******************************************************* */
    
    @OnError
    public void onError(Throwable t) { log.error("SOCKET: error: " + t.getMessage(), t); }
    
    /* ******************************************************** END ON ERROR ******************************************************* */
    
    /* *************************************************** START PRIVATE METHODS *************************************************** */
    
    private <T> void whisperAll(SocketReturnWrapper<T> wrap) {
        
        Iterator<Entry<Session, String>> listenIter = listeners_session.entrySet().iterator();
        while(listenIter.hasNext()) { this.whisper(wrap, listenIter.next().getKey()); }
    }
    
    private <T> void whisper(SocketReturnWrapper<T> wrap, Session to) {

        try { to.getBasicRemote().sendObject(wrap); }
        catch(Exception e) { log.error("SOCKET: whisper exception", e); }
    }

    private <T> void parseIntent(Session whisperBackSession, SocketIntentWrapper<T> intentWrap) {

        switch(intentWrap.getIntent()) {
            
            case 202 : //user wants to start game
                assert(intentWrap.getPayload() instanceof ArrayIntegerWrapper);
                this.pendGame(whisperBackSession, (ArrayIntegerWrapper<String>) intentWrap.getPayload(), intentWrap.getIdentifier());
                break;
            case 203 : //user accepts or declines game
                assert(intentWrap.getPayload() instanceof ArrayIntegerWrapper);
                this.startGame(whisperBackSession, (ArrayIntegerWrapper<String>) intentWrap.getPayload(), intentWrap.getIdentifier());
                break;
            case 204:
                assert(intentWrap.getPayload() instanceof ArrayIntegerWrapper);
                ArrayIntegerWrapper payload = (ArrayIntegerWrapper) intentWrap.getPayload();
                
                ArrayList<ArrayList<Integer>> array = (ArrayList<ArrayList<Integer>>) payload.getArray();
                Integer gameType = payload.getInteger();
    
                Integer arrayHeight = array.size();
                Integer arrayWidth = array.get(0).size();
    
                Integer[][] gameBoard = new Integer[arrayHeight][arrayWidth];
                for (int i = 0; i < arrayHeight; i++) {
                    for (int j = 0; j < arrayWidth; j++) { gameBoard[i][j] = array.get(i).get(j); }
                }
                this.gameMove(whisperBackSession, gameType, gameBoard, intentWrap.getIdentifier());
                break;
            default : //echo intent payload
                this.echoIntent(whisperBackSession, intentWrap.getPayload().toString(), intentWrap.getIdentifier());
                break;
        }
    }
    
    private void echoIntent(Session whisperBackSession, String toEcho, String echoTo) {
    
        SocketReturnWrapper<String> echo = new SocketReturnWrapper<>(
                201,
                new ObjectReturnWrapper<>(200, new String("ECHO :[" + toEcho + "]"), null)
        );
    
        whisper(echo, whisperBackSession);
    }
    
    private void pendGame(Session whisperBackSession, ArrayIntegerWrapper<String> wrapper, String id1) {
        
        String id2 = wrapper.getArray().get(0);
        
        UserInterface requester = uService.getUser(id1);
        if (requester != null) { //if requester valid
            
            if (!id2.toUpperCase().equals("AI")) { //send challenge request to desired player
    
                UserInterface requested = uService.getUser(id2);
                assert(requested != null);
                if (listeners_user.get(requested.getIdApp()) != null) { //if requested valid
                    
                    //get session of requested
                    Session requestedSession = listeners_user.get(requested.getIdApp());
                    //store game request info
                    pendingGameList.add(wrapper);
                    //whisper request to requested
                    ArrayList<String> ids = new ArrayList<>();
                    ids.add(id1);
                    SocketReturnWrapper<ObjectReturnWrapper<ArrayIntegerWrapper<String>>> requestGameIntent = new SocketReturnWrapper<>(
            
                            202,
                            new ObjectReturnWrapper<>(200, new ArrayIntegerWrapper(ids, wrapper.getInteger()), null)
                    );
                    whisper(requestGameIntent, requestedSession);
                } else {
    
                    SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<>(
            
                            202,
                            new ObjectReturnWrapper<>(550, new String("Competing user with ID [" + id2 + "] not found"), null)
                    );
                    whisper(intentReturn, whisperBackSession);
                }
            } else { //start game with AI
    
                String gs_id = gService.generateGS((User) requester, null, wrapper.getInteger(), true);
                startedGameList.add(gs_id);
                
                SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<>(
                    
                    203,
                    new ObjectReturnWrapper<>(200, gs_id, null)
                );
                whisper(intentReturn, whisperBackSession);
            }
        } else {
    
            SocketReturnWrapper<String> intentReturn = new SocketReturnWrapper<>(
        
                    202,
                    new ObjectReturnWrapper<>(550, new String("Invalid user ID [" + id1 + "] entered"), null)
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
            if (listeners_user.get(requester.getIdApp()) != null) { //if original requester valid
    
                Session requesterSession = listeners_user.get(requested.getIdApp());
                if (wrapper.getInteger() == 100) { //requested user declined, send notification to requester
                    
                    SocketReturnWrapper<ObjectReturnWrapper<String>> intentReturn = new SocketReturnWrapper<>(
                            
                            203,
                            new ObjectReturnWrapper<>(200, null, null)
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
                        SocketReturnWrapper<ObjectReturnWrapper<String>> requesterReturn = new SocketReturnWrapper<>(
            
                                203,
                                new ObjectReturnWrapper<>(200, gs_id, null)
                        );
                        whisper(requesterReturn, requesterSession);
                        //send notification of started game to requester
                        SocketReturnWrapper<ObjectReturnWrapper<String>> requestedReturn = new SocketReturnWrapper<>(
            
                                203,
                                new ObjectReturnWrapper<>(200, gs_id, null)
                        );
                        whisper(requestedReturn, requesterSession);
                    } else {
    
                        SocketReturnWrapper<ObjectReturnWrapper<String>> intentReturn = new SocketReturnWrapper<>(
            
                                203,
                                new ObjectReturnWrapper<>(550, new String("Invalid game info received"), null)
                        );
                        whisper(intentReturn, whisperBackSession);
                    }
                }
            } else {
        
                SocketReturnWrapper<ObjectReturnWrapper<String>> intentReturn = new SocketReturnWrapper<>(
                
                        203,
                        new ObjectReturnWrapper<>(550, new String("Competing user with ID [" + id2 + "] not found"), null)
                );
                whisper(intentReturn, whisperBackSession);
            }
        } else {
    
            SocketReturnWrapper<ObjectReturnWrapper<String>> intentReturn = new SocketReturnWrapper<>(
            
                    203,
                    new ObjectReturnWrapper<>(550, new String("Invalid user ID [" + id1 + "] entered"), null)
            );
            whisper(intentReturn, whisperBackSession);
        }
    }
    
    private void gameMove(Session whisperBackSession, Integer game_type, Integer[][] gameBoard, String game_id) {
        
        if (startedGameList.contains(game_id)) {
            GameSession gs = gService.getGameSession(game_id);
            if (gs != null) {
                
                boolean aiWon = false;
                
                ArrayList<ArrayList<Integer>> gameBoard_objectStyle = new ArrayList<>();
                switch (game_type) {
            
                    case 0: //game is tic tac toe
                        gs.getTic().setBoard(gameBoard);
                        gs.getTic().setNumMoves(gs.getTic().getNumMoves() + 1);
                        if (gs.getAi() && !gs.getTic().checkForWin()) {
                            
                            gs.getTic().setBoard(gs.getTic().AImove(gs.getTic().getBoard()));
                            gs.getTic().setNumMoves(gs.getTic().getNumMoves() + 1);
                            if (gs.getTic().checkForWin()) { aiWon = true; }
                        }
                
                        for (int i = 0; i < gs.getTic().getBoard().length; i++) {
                            ArrayList<Integer> gameRow_temp = new ArrayList<>();
                            for (int j = 0; j < gs.getTic().getBoard()[0].length; j++) {
                                gameRow_temp.add(gs.getTic().getBoard()[i][j]);
                            }
                            gameBoard_objectStyle.add(gameRow_temp);
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
                
                //get players and whisper updated game boards if applicable
                UserInterface playerWon = uService.getUser(listeners_session.get(whisperBackSession));
                
                SocketReturnWrapper<ObjectReturnWrapper<ArrayList<ArrayList<Integer>>>> intentReturn = new SocketReturnWrapper<>(
                
                        204,
                        new ObjectReturnWrapper<>(200, gameBoard_objectStyle, null)
                );
                whisper(intentReturn, whisperBackSession); //whisper updated game board
                if (!gs.getAi()) { //whisper updated game board to player 2
                    
                    UserInterface otherPlayer;
                    if (!listeners_session.get(whisperBackSession).equals(gs.getPlayer1().getIdApp())) { otherPlayer = gs.getPlayer2(); }
                    else { otherPlayer = gs.getPlayer1(); }
                    Session otherPlayerListener = listeners_user.get(otherPlayer.getIdApp());
                    whisper(intentReturn, otherPlayerListener);
                }
                
                //check game states
                if (!aiWon) { //if the ai didn't win
                    if (gs.getTic().checkForWin()) { //if game is won
        
                        playerWon.setWins(playerWon.getWins() + 1);
        
                        SocketReturnWrapper<ObjectReturnWrapper<Integer>> wonIntentReturn = new SocketReturnWrapper<>(
                                205,
                                new ObjectReturnWrapper(200, 1, null)
                        );
                        whisper(wonIntentReturn, whisperBackSession); //whisper to player that they won
                        if (!gs.getAi()) { //whisper to other player that they lost
    
                            UserInterface otherPlayer;
                            if (!listeners_session.get(whisperBackSession).equals(gs.getPlayer1().getIdApp())) { otherPlayer = gs.getPlayer2(); }
                            else { otherPlayer = gs.getPlayer1(); }
                            Session otherPlayerListener = listeners_user.get(otherPlayer.getIdApp());
                            otherPlayer.setLosses(otherPlayer.getLosses() + 1);
                            wonIntentReturn = new SocketReturnWrapper<>(
                                    205,
                                    new ObjectReturnWrapper(200, 2, null)
                            );
                            whisper(wonIntentReturn, otherPlayerListener);
    
                            uService.saveUser_existing(otherPlayer);
                        }
    
                        gService.removeGs(gs.getId_db());
                    }
                } else { //if the ai did win
                
                    playerWon.setLosses(playerWon.getLosses() + 1);
                    SocketReturnWrapper<ObjectReturnWrapper<Integer>> wonIntentReturn = new SocketReturnWrapper<>(
                            205,
                            new ObjectReturnWrapper(200, 2, null)
                    );
                    whisper(wonIntentReturn, whisperBackSession); //whisper to player that they lost
                    
                    gService.removeGs(gs.getId_db());
                }
                
                if (gs.getTic().checkForCat()) { //if there is a cat game
        
                    SocketReturnWrapper<ObjectReturnWrapper<Integer>> wonIntentReturn = new SocketReturnWrapper<>(
                            205,
                            new ObjectReturnWrapper(200, 0, null)
                    );
                    whisper(wonIntentReturn, whisperBackSession); //whisper to player that it's a tie game
                    if (!gs.getAi()) { //whisper to other player that it's a tie game
                        UserInterface otherPlayer;
                        if (!listeners_session.get(whisperBackSession).equals(gs.getPlayer1().getIdApp())) { otherPlayer = gs.getPlayer2(); }
                        else { otherPlayer = gs.getPlayer1(); }
                        Session otherPlayerListener = listeners_user.get(otherPlayer.getIdApp());
                        whisper(wonIntentReturn, otherPlayerListener);
                        
                        uService.saveUser_existing(otherPlayer);
                    }
    
                    gService.removeGs(gs.getId_db());
                }
            
                //save database changes
                uService.saveUser_existing(playerWon);
            } else {
        
                SocketReturnWrapper<ObjectReturnWrapper<String>> intentReturn = new SocketReturnWrapper<>(
                
                        204,
                        new ObjectReturnWrapper<>(550, new String("Game Session with id [" + game_id + "] not found"), null)
                );
                whisper(intentReturn, whisperBackSession);
            }
        } else {
    
            SocketReturnWrapper<ObjectReturnWrapper<String>> intentReturn = new SocketReturnWrapper<>(
            
                    204,
                    new ObjectReturnWrapper<>(550, new String("Game Session with id [" + game_id + "] not started"), null)
            );
            whisper(intentReturn, whisperBackSession);
        }
    }
    
    /* **************************************************** END PRIVATE METHODS **************************************************** */
    
    /* ************************************************* END WEB SOCKET COMPONENT ************************************************** */
}
