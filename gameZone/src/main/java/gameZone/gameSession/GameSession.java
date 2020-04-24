package gameZone.gameSession;

import gameZone.checkers.Checkers;
import gameZone.components.GlobalResources;
import gameZone.ticTacToe.TicTacToe;
import gameZone.user.User;
import gameZone.user.UserInterface;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "gameSession")
public class GameSession {

	/*** START INSTANCE VARIABLE ***/
	
	/**
	 * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
	 */
	@Transient
	private final GlobalResources gRec = new GlobalResources(null, null);
	
	/**
	 * List for the {@code GameSession} users. There should normally be 2 users.
	 */
	@OneToMany(targetEntity = User.class,
			fetch = FetchType.EAGER, mappedBy = "gameSession")
	private List<UserInterface> users;
	/**
	 * ID for this {@code GameSession}. Used for identification in the database
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id_db;
	
	private String id_app;

	private Boolean ai;
	
	/**
	 * Game Status for this {@code GameSession}. Used for telling current status of the gameSession. -1 means the game is yet to start. 0 means playing. 1 means player 1 has won. 2 means player 2 has won.
	 */
	private Integer gameStatus;

	/**
	 * Game type for this {@code GameSession}. Used for telling what game is being ran in this session. 0 is tictactoe, 1 is checkers, 2 is chess, 3 is ultimate tictactoe.
	 */
	private Integer gameType;

	/**
	 * Tictactoe game for this {@code GameSession}. Used for holding the tictactoe game if one is being played.
	 */
	@Embedded
	private TicTacToe tic;

	/**
	 * Checkers game for this {@coee GameSession}. Used for holding the Checkers game if one is being played.
	 */
	@Embedded
	private Checkers check;

	/***END INSTANCE VARIABLES***/
	
	
	/***START CONSTRUCTOR***/
	
	/**
	 * Default Constructor
	 */
	public GameSession() {
		
		this.setUsers(new ArrayList<User>());
		this.setGameStatus(-1);
		this.setId_app(new String());
	}
	
	/***END CONSTRUCTORS***/

	/***START GETTERS/SETTERS***/

	public Integer getId_db() {
		return id_db;
	}
	public void setId_db(int id){
		id_db = id;
	}

	public Boolean getAi()
	{
		return ai;
	}

	public void setAi(Boolean ai)
	{
		this.ai = ai;
	}
	public void addPlayers(UserInterface player1, UserInterface player2) {
		ArrayList<User> toAdd = new ArrayList<>();
		toAdd.add((User) player1);
		toAdd.add((User) player2);
		this.setUsers(toAdd);
	}

	public Integer getGameStatus() { return gameStatus; }
	
	public void setGameStatus(Integer gameStatus) { this.gameStatus = gameStatus; }
	
	public String getId_app() { return id_app; }
	
	public void setId_app(String id_app) { this.id_app = id_app; }
	
	public List<UserInterface> getUsers() { return this.users; }
	public void setUsers(ArrayList<User> users)
	{
		this.users = new ArrayList<>(users);
	}

	public TicTacToe getTic()
	{
		return tic;
	}

	public void setTic(TicTacToe tic)
	{
		this.tic = tic;
	}

	public Checkers getCheck()
	{
		return check;
	}

	public void setCheck(Checkers check)
	{
		this.check = check;
	}
	
	/***END GETTERS/SETTERS***/
	
	/***OTHER METHODS***/

	public void startGame()
	{
		gameStatus = 0;
	}
}