package gameZone.gameSession;

import gameZone.components.GlobalResources;
import gameZone.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "gameSession")
public class GameSession {

	/*** START INSTANCE VARIABLE ***/

	/**
	 * List for the {@code GameSession} users. There should normally be 2 users.
	 */
	@OneToMany (targetEntity = User.class)
	private List<User> users;
	/**
	 * ID for this {@code GameSession}. Used for identification in the database
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id_db;

	/**
	 * Game Status for this {@code gameSession}. Used for telling current status of the gameSession. -1 means the game is yet to start. 0 means playing. 1 means player 1 has won. 2 means player 2 has won.
	 */
	private Integer gameStatus;
	
	/***END INSTANCE VARIABLES***/
	
	
	/***START CONSTRUCTOR***/
	
	/**
	 * Default Constructor
	 */
	public GameSession() {
		
		this.setUsers(new ArrayList<User>());
		this.setGameStatus(-1);
		
	}
	
	/**
	 * Constructor with both Users
	 */
	public GameSession(User player1, User player2) {

		this.setUsers(new ArrayList<User>());
		this.addPlayers(player1, player2);
		this.setGameStatus(-1);
		
	}
	
	/***END CONSTRUCTORS***/
	
	/***START GETTERS/SETTERS***/

	public User getPlayer1() {
		for(int i = 0; i < users.size(); i++)
		{
			if (users.get(i).getPlace() == 1)
			{
				return users.get(i);
			}
		}
		return null;
	}

	public void addPlayers(User player1, User player2) { this.users.add(player1); this.users.add(player2); }

	public User getPlayer2() {
		for(int i = 0; i < users.size(); i++)
		{
			if (users.get(i).getPlace() == 2)
			{
				return users.get(i);
			}
		}
		return null;
	}

	public Integer getGameStatus() { return gameStatus; }

	public void setGameStatus(Integer gameStatus) { this.gameStatus = gameStatus; }

	public void setUsers(ArrayList<User> users)
	{
		this.users = users;
	}
	
	/***END GETTERS/SETTERS***/
	
	/***OTHER METHODS***/

	public void startGame()
	{
		gameStatus = 0;

	}

}