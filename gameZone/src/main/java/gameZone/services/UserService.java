package gameZone.services;

import gameZone.components.GlobalResources;
import gameZone.repositories.UserRepository;
import gameZone.user.User;
import gameZone.user.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service for {@code UserController}
 */
@Service
public class UserService {

    /* ************************************************* START INSTANCE VARIABLES ************************************************** */

    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Autowired
    private GlobalResources gRec;

    /**
     * {@code UserRepository} for this service
     */
    @Autowired
    private UserRepository uRepo;

    /* ************************************************** END INSTANCE VARIABLES *************************************************** */

    /* **************************************************** START CONSTRUCTORS ***************************************************** */

    /**
     * Default constructor
     * @param gRec
     * 		See {@code webClient.components.GlobalResources}
     * @param uRepo
     *      See {@code webClient.repositories.UserRepository}
     */
    public UserService(GlobalResources gRec, UserRepository uRepo) {

        this.gRec = gRec;

        this.uRepo = uRepo;
    }

    /* ***************************************************** END CONSTRUCTORS ****************************************************** */

    /* ***************************************************** START GET HELPERS ***************************************************** */



    /* ****************************************************** END GET HELPERS ****************************************************** */

    /* **************************************************** START POST HELPERS ***************************************************** */

    public String generateUserID() {

        String userId = gRec.confirmAuthenticator();

        UserInterface u = new User();
        u.setIdApp(userId);

        uRepo.save((User) u);
        return u.getIdApp();
    }

    public UserInterface getUser(String id) {

        for (UserInterface u : uRepo.findAll()) {

            if (u.getIdApp().equals(id)) { return u; }
        }

        return null;
    }

    /* ***************************************************** END POST HELPERS ****************************************************** */
    
    public boolean saveUser_new(UserInterface u) {
    
        uRepo.save((User) u);
        return true;
    }
    
    public boolean saveUser_existing(UserInterface u) {
    
        for (UserInterface u_db : uRepo.findAll()) {
            
            if (u_db.getIdApp().equals(u.getIdApp())) {
                
                uRepo.save((User) u);
                return true;
            }
        }
        
        return false;
    }
    
    /* ******************************************************* END USER SERVICE **************************************************** */
}
