package gameZone.controllers;

import gameZone.GameZone;
import gameZone.components.GlobalResources;
import gameZone.enums.GameZoneExceptionType;
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

import java.util.ArrayList;

/**
 * Controller that handles HTTP queries for {@code Users}
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {

    /* ************************************************* START INSTANCE VARIABLES ************************************************** */

    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Autowired
    private GlobalResources gRec;

    /**
     * {@code UserService} for this controller
     */
    @Autowired
    private UserService uService;

    /**
     * {@code Log} for this controller
     */
    private Log log;

    /* ************************************************** END INSTANCE VARIABLES *************************************************** */

    /* **************************************************** START CONSTRUCTORS ***************************************************** */

    /**
     * Default constructor
     * @param gRec
     *      See {@code this.gValue}
     * @param uService
     * 		See {@code webClient.services.WebService}
     */
    public UserController(GlobalResources gRec, UserService uService) {

        this.gRec = gRec;
        this.uService = uService;

        this.log = LogFactory.getLog(GameZone.class);
    }

    /* ***************************************************** END CONSTRUCTORS ****************************************************** */

    /* **************************************************** START GET MAPPINGS ***************************************************** */



    /* ***************************************************** END GET MAPPINGS ****************************************************** */

    /* *************************************************** START POST MAPPINGS ***************************************************** */

    @PostMapping(value = "/generate/token")
    @ResponseBody
    public ObjectReturnWrapper<String> generateUserID() {

        log.info("Attempting to create new user id and add user to database");

        String userId;
        try { userId = uService.generateUserID(); }
        catch (Exception e) {

            ExceptionUpdateWrapper exception = gRec.generateExceptionMap(e.getClass(), GameZoneExceptionType.SYSTEM, 550, e.getMessage());
            log.error(e.getMessage(), e);
            ArrayList<ExceptionUpdateWrapper> exceptionList = new ArrayList<>();
            exceptionList.add(exception);
            return new ObjectReturnWrapper<>(exception.getExceptionStatus(), null, exceptionList);
        }

        String logMessage = "User with ID [" + userId + "] added to database";
        gRec.successHandler(log, logMessage, userId);
        return new ObjectReturnWrapper<>(200, userId, null);
    }

    /* **************************************************** END POST MAPPINGS ****************************************************** */

    /* ***************************************************** END USER CONTROLLER *************************************************** */
}
