package gameZone.controllers;

import gameZone.GameZone;
import gameZone.components.GlobalResources;
import gameZone.enums.GameZoneExceptionType;
import gameZone.exceptions.GameZoneException;
import gameZone.services.DefaultService;
import gameZone.services.GameSessionService;
import gameZone.services.UserService;
import gameZone.wrappers.ExceptionUpdateWrapper;
import gameZone.wrappers.ObjectReturnWrapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller that handles HTTP queries for {@code Sessions}
 */
@Controller(value = "/session")
public class GameSessionController {
	
	/*** START INSTANCE VARIABLE ***/
	
	/**
	 * {@code GlobalResources} {@code Component}. Grants the ability to use global variable and methods common to other {@code classes} in this Application. 
	 */
	@Autowired
	private GlobalResources gRec;
	
	/**
	 * {@code GameSessionService} for this controller
	 */
	@Autowired
	private GameSessionService gService;
	
	/**
	 * {@code Log} for this controller
	 */
	private Log log = LogFactory.getLog(GameZone.class);
	
	/*** END INSTANCE VARIABLE ***/
	
	/*** START CONSTRUCTORS ***/
	
	/**
	 * Default constructor
	 * @param gRec
	 * 		See {@code this.gValue}
	 * @param gService
	 * 		See {@code webCLient.services.WebService}
	 */
	public GameSessionController(GlobalResources gRec, GameSessionService gService)
	{
		this.gService = gService;
		this.gRec = gRec;
	}
	
	/*** END CONSTRUCTORS ***/
	
}