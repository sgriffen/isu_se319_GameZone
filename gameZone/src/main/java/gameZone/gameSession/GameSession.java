package gamezone.gameSession;

@Entity
@Table(name = "gameSession")
public class GameSession {
	
	/*** START INSTANCE VARIABLE ***/
	/**
	 * Player 1 for this {@code gameSession}.
	 */
	private User player1;
	
	/**
	 * Player 2 for this {@code gameSession}.
	 */
	private User player2;
	
	
	/**
	 * Game Status for this {@code gameSession}. Used for telling current status of the gameSession. 0 means playing. 1 means player 1 has won. 2 means player 2 has won.
	 */
	private Integer gameStatus;
	
	/***END INSTANCE VARIABLES***/
	
	
	/***START CONSTRUCTOR***/
	
	/**
	 * Default Constructor
	 */
	public gameSession() {
		
		this.setPlayer1(null);
		this.setPlayer2(null);
		this.setGameStatus(0);
		
	}
	
	/**
	 * Contructor with both Users
	 */
	public gameSession(User player1, User player2) {
		
		this.setPlayer1(player1);
		this.setPlayer2(player2);
		this.setGameStatus(0);
		
	}
	
	/***END CONSTRUCTORS***/
	
	/***START GETTERS/SETTERS***/
	
	@Override
	public User getPlayer1() { return player1; }
	@Override
	public void setPlayer1(User player1) { this.player1 = player1; }
	@Override
	public User getPlayer2() { return player2; }
	@Override
	public void getPlayer2(User player2) { this.player2 = player2; }
	
	@Override
	public Integer getGameStatus() { return gameStatus; }
	@Override
	public void setGameStatus(Integer gameStatus) { this.gameStatus = gameStatus; }
	
	/***END GETTERS/SETTERS***/
	
	
	}
	
}