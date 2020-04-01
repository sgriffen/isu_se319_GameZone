package gamezone.session;

@Entity
@Table(name = "session")

public class Session {
	
	/*** START INSTANCE VARIABLE ***/
	/**
	 * Player 1 for this {@code Session}.
	 */
	private User player1;
	
	/**
	 * Player 2 for this {@code Session}.
	 */
	private User player2;
	
	
	/**
	 * Game Status for this {@code Session}. Used for telling current status of the Session. 0 means no game. 1 means there is a game loaded. 2 means there is a game being played. 3 means a game has ended.
	 */
	private Integer gameStatus;
	
	/***END INSTANCE VARIABLES***/
	
	
	/***START CONSTRUCTOR***/
	
	/**
	 * Default Constructor
	 */
	public Session() {
		
		this.setPlayer1(null);
		this.setPlayer2(null);
		this.setGameStatus(0);
		
	}
	
	/**
	 * Contructor with both Users
	 */
	public Session(User player1, User player2) {
		
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