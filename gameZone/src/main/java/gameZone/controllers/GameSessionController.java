package gameZone.controllers;

import gamezone.GameZone;

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