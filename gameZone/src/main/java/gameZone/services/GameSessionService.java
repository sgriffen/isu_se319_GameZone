package gameZone.services;

import gameZone.components.GlobalResources;
import gameZone.repositories.GameSessionRepository;
import gameZone.gameSession.GameSession;
import gameZone.repositories.UserRepository;
import gameZone.ticTacToe.TicTacToe;
import gameZone.user.User;
import gameZone.user.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

	public String generateGS(GameSession gs_setup, ArrayList<User> players, int gameType, Boolean ai) {
		
		gs_setup.setAi(ai);
		gs_setup.setId_app(gRec.confirmAuthenticator());
		gs_setup.setUsers(players);
		switch(gameType) {
			default:
				gs_setup.setTic(new TicTacToe());
				break;
		}
		gRepo.save(gs_setup);
		
		int i = 1;
		for (UserInterface u : players) {
		
			u.setPlace(i);
			u.setGameSession(gs_setup);
			uRepo.save((User) u);
		}
		
		return gs_setup.getId_app();
	}
	
	public GameSession getGameSession(String id) {
	
		for (GameSession gs : gRepo.findAll()) {
		
			if (gs.getId_app().equals(id)) { return gs; }
		}
			return null;
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
	
	public boolean removeGs(Integer gs_id) {
	
		try { gRepo.deleteById(gs_id); }
		catch(Exception e) { return false; }
		return true;
	}
	
	public GameSession gameMove(String gs_id, Integer game_type, Integer[][] gameBoard) {
		
		GameSession gs = getGameSession(gs_id);
		
		if (gs != null) {
			
			boolean aiWon = false;
			
			switch (game_type) {
				
				case 0: //game is tic tac toe
					gs.getTic().setBoard(gameBoard);
					gs.getTic().setNumMoves(gs.getTic().getNumMoves() + 1);
					if (gs.getTic().checkForWin()) { gs.setGameStatus(1); }
					if (gs.getAi() && gs.getGameStatus() != 1) {
						
						gs.getTic().setBoard(gs.getTic().AImove(gs.getTic().getBoard()));
						gs.getTic().setNumMoves(gs.getTic().getNumMoves() + 1);
						if (gs.getTic().checkForWin()) {
							gs.setGameStatus(2);
						}
					}
					break;
				case 1: //game is checkers
					
					break;
				case 2: //game is chess
					
					break;
				default: //game is ultimate tic tac toe
					
					break;
			}
			gRepo.save(gs);
			
			return gs;
		}
		
		return null;
	}
}
