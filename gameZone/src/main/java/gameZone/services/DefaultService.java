package gameZone.services;

import gameZone.components.GlobalResources;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * {@code Service} for {@code DefaultController}
 *
 * @author Sean Griffen
 */
@Service
public class DefaultService {

    /* ************************************************* START INSTANCE VARIABLES ************************************************** */

    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Autowired
    private GlobalResources gRec;

    /**
     * File path to html files
     */
    private String htmlPrefix;

    /* ************************************************** END INSTANCE VARIABLES *************************************************** */

    /* **************************************************** START CONSTRUCTORS ***************************************************** */

    /**
     * Default constructor
     * @param gRec
     * 		See {@code webClient.components.GlobalResources}
     */
    public DefaultService(GlobalResources gRec) {

        this.gRec = gRec;
        htmlPrefix = "default" + gRec.getFileSep();
    }

    /* ***************************************************** END CONSTRUCTORS ****************************************************** */

    /* ***************************************************** START GET HELPERS ***************************************************** */

    /**
     * HTML page for default {@code DefaultController} request
     * @return
     * 		{@code String}
     */
    public String index() { return htmlPrefix + "HomeScreen"; }

    /* ****************************************************** END GET HELPERS ****************************************************** */

    /* ***************************************************** END DEFAULT SERVICE *************************************************** */
}
