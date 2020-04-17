package gameZone.services;

import gameZone.components.GlobalResources;
import gameZone.repositories.GameSessionRepository;
import gameZone.gameSession.GameSession;
import gameZone.repositories.UserRepository;
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
	
	@Autowired
	private UserRepository uRepo;
	
	/***END INSTANCE VARIABLES***/
	
	/***START CONSTRUCTORS***/
	
	/**
	 * Default contructor
	 * @param gRec
	 * 		See {@code webClient.components.GlobalResources}
	 * @param gRepo
	 * 		See {@code webClient.repositories.GameSessionRepository}
	 */
	public GameSessionService(GlobalResources gRec, GameSessionRepository gRepo, UserRepository uRepo) {

		this.gRec = gRec;
		this.gRepo = gRepo;
		this.uRepo = uRepo;
	}
	
	/***END CONSTRUCTORS***/

	/***HELPERS***/

	public String generateGS(User player1, User player2, int gameType) {
		
		GameSession gs = new GameSession(player1, player2, gameType);
		
		player1.setGameSession(gs);
		player2.setGameSession(gs);
		player1.setPlace(1);
		player2.setPlace(2);
		uRepo.save(player1);
		uRepo.save(player2);
		
		gs.setId_app(gRec.confirmAuthenticator());
		gRepo.save(gs);
		
		return gs.getId_app();
	}
	
	public boolean saveGS_existing(GameSession gs) {
		
		for (GameSession g : gRepo.findAll()) {
			
			if (g.getId_app().equals(gs.getId_app())) {
				
				gRepo.save(gs);
				return true;
			}
		}
		return false;
	}
	
	public boolean saveGS_new(GameSession gs) {
		
		gRepo.save(gs);
		return true;
	}
}
