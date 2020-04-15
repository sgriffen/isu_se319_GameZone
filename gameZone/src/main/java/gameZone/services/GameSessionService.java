package gameZone.services;

import gameZone.components.GlobalResources;
import gameZone.repositories.GameSessionRepository;
import gameZone.gameSession.GameSession;
import gameZone.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/* 
 * Service for {@code SessionController}
 */
@Service
public class GameSessionService {
	
	/***START INSTANCE VARIABLES***/
	
	/**
	 * {@code GlobalResources} {@code Copmonent}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
	 */
	@Autowired
	private GlobalResources gRec;
	
	/**
	 * {@code UserRepository} for this service
	 */
	@Autowired
	private GameSessionRepository gRepo;
	
	/***END INSTANCE VARIABLES***/
	
	/***START CONSTRUCTORS***/
	
	/**
	 * Default contructor
	 * @param gRec
	 * 		See {@code webClient.components.GlobalResources}
	 * @param gRepo
	 * 		See {@code webClient.repositories.GameSessionRepository}
	 */
	public GameSessionService(GlobalResources gRec, GameSessionRepository gRepo) {

		this.gRec = gRec;
		this.gRepo = gRepo;
	}
	
	/***END CONSTRUCTORS***/

	/***HELPERS***/

	public String generateGS(User player1, User player2, int gameType) {
		
		GameSession gs = new GameSession(player1, player2, gameType);
		player1.setGameSession(gs);
		player2.setGameSession(gs);
		gs.setId_app(gRec.confirmAuthenticator());
		gRepo.save((GameSession)gs);
		
		return gs.getId_app();
	}
	
	public void saveGS(GameSession gs) { gRepo.save(gs); }
}
