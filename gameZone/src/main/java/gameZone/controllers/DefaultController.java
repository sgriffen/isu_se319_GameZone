package gameZone.controllers;

import gameZone.GameZone;
import gameZone.components.GlobalResources;
import gameZone.services.DefaultService;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.apache.commons.logging.Log;

/**
 * Controller that handles HTTP queries for {@code non-objects}
 */
@Controller
@RequestMapping("")
public class DefaultController {

    /* ************************************************* START INSTANCE VARIABLES ************************************************** */

    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Autowired
    private GlobalResources gRec;

    /**
     * {@code DefaultService} for this controller
     */
    @Autowired
    private DefaultService dService;

    /**
     * {@code Log} for this controller
     */
    private Log log = LogFactory.getLog(GameZone.class);

    /**
     * Directory {@code HTML} resources are in for this {@code Controller}
     */
    private String resourcePrefix;

    /* ************************************************** END INSTANCE VARIABLES *************************************************** */

    /* **************************************************** START CONSTRUCTORS ***************************************************** */

    /**
     * Default constructor
     * @param gRec
     *      See {@code this.gValue}
     * @param dService
     * 		See {@code webClient.services.DefaultService}
     */
    public DefaultController(GlobalResources gRec, DefaultService dService) {

        this.dService = dService;

        resourcePrefix = "templates" + gRec.getFileSep() + "default" + gRec.getFileSep();
    }

    /* ***************************************************** END CONSTRUCTORS ****************************************************** */

    /* **************************************************** START GET MAPPINGS ***************************************************** */

    @GetMapping(value = "")
    public String index() { return dService.index(); }

    /* ***************************************************** END GET MAPPINGS ****************************************************** */

    /* *************************************************** END DEFAULT CONTROLLER ************************************************** */
}
