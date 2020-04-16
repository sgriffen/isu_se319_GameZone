package gameZone.components;

import gameZone.enums.GameZoneExceptionType;
import gameZone.repositories.UserRepository;
import gameZone.user.User;
import gameZone.user.UserInterface;
import gameZone.wrappers.ExceptionUpdateWrapper;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class GlobalResources {

    private String fileSep;

    private String resourceLoc;

    private String outputLoc;

    @Autowired
    private UserRepository uRepo;

    public GlobalResources(UserRepository uRepo) {

        this.fileSep = File.separator;
        
       /* sean */
        resourceLoc = "C:" + fileSep + "Users" + fileSep + "griff" + fileSep + "Documents" + fileSep + "school" + fileSep + "se319" + fileSep + "proj" + fileSep + "g11" + fileSep + "gameZone" + fileSep + "src" + fileSep + "main" + fileSep + "resources" + fileSep;
        outputLoc = "C:" + fileSep + "Users" + fileSep + "griff" + fileSep + "Documents" + fileSep + "school" + fileSep + "se319" + fileSep + "proj" + fileSep + "g11" + fileSep + "gameZone" + fileSep + "output";
//        /* jamie */
//        resourceLoc = "gameZone" + fileSep + "src" + fileSep + "main" + fileSep + "resources" + fileSep;
//        outputLoc = "gameZone" + fileSep + "src" + fileSep + "main" + fileSep + "resources" + fileSep;
//        /* kira */
//        resourceLoc = "gameZone" + fileSep + "src" + fileSep + "main" + fileSep + "resources" + fileSep;
//        outputLoc = "gameZone" + fileSep + "src" + fileSep + "main" + fileSep + "resources" + fileSep;
//        /* rob */
//        resourceLoc = "C:"+ fileSep +"Users"+ fileSep +"robby"+ fileSep +"SE 319"+ fileSep +"Game Zone"+ fileSep +"g11"+ fileSep +"gameZone"+ fileSep +"src"+ fileSep +"main"+ fileSep +"resources";
//        outputLoc = "C:"+ fileSep +"Users"+ fileSep +"robby"+ fileSep +"SE 319"+ fileSep +"Game Zone"+ fileSep +"g11"+ fileSep +"gameZone"+ fileSep +"output";
//        /* live */
//        resourceLoc = fileSep + "g11" + fileSep + "resources" + fileSep;
//        outputLoc = fileSep + "g11" + fileSep + "output" + fileSep;

        this.uRepo = uRepo;
    }

    /**
     * Get {@code fileSep}
     * @return
     *      {@code fileSep}
     */
    public String getFileSep() { return fileSep; }

    /**
     * Get {@code RESOURCE_LOC}
     * @return
     *      {@code RESOURCE_LOC}
     */
    public String getResourceLoc() { return resourceLoc; }

    /**
     * Get {@code OUTPUT_LOC}
     * @return
     *      {@code OUTPUT_LOC}
     */
    public String getOutputLoc() { return outputLoc; }

    /**
     * Generates a new {@code String} authenticator. Ensures that said {@code String} is unique
     * @return
     * 		Unique {@code String} authenticator
     */
    public String confirmAuthenticator() {

        String auth = this.generateAuthenticator();

        boolean isEqual = true;
        while (isEqual) {

            List<User> users = uRepo.findAll();
            if (users.size() > 0) {
                for (UserInterface uCheck : users) {

                    if (uCheck.getIdApp().equals(auth)) {

                        isEqual = true;
                        break;
                    } else { isEqual = false; }
                    if (isEqual) { break; }
                }
                if (isEqual) { auth = this.generateAuthenticator(); }
            } else { isEqual = false; }
        }

        return auth;
    }

    /**
     * Handles successful executions by {@code @Services}
     * @param log
     *      {@code Log} to write messages to
     * @param logS
     * 		{@code String} to log
     * @param s
     * 		{@code String} to return
     * @return
     * 		{@code String}
     */
    public String successHandler(Log log, String logS, String s) {

        log.info(logS);
        return s;
    }

    /**
     * Called when a thrown exception is caught
     * <br>
     * Creates an {@code ExceptionUpdateWrapper} so if an error is thrown, information is returned to the frontend so a bug report can be submitted
     * @param eClass
     * 		{@code Class} of the {@code Exception} thrown
     * @param eType
     * 		{@code WebClientExceptionType} of the exception
     * @param eCode
     * 		Status code to display and handle on the error webpage
     * @param eMessage
     * 		{@code String} to display on the error webpage. Used for {@code Exception} diagnosis
     * @return
     * 		See {@code webClient.wrappers.ExceptionUpdateWrapper}
     */
    public ExceptionUpdateWrapper generateExceptionMap(Class<?> eClass, GameZoneExceptionType eType, int eCode, String eMessage) {

        List<Class<?>> eClasses = new ArrayList<>();
        List<GameZoneExceptionType> eTypes = new ArrayList<>();
        List<Integer> eCodes = new ArrayList<>();
        List<String> eMessages = new ArrayList<>();

        eClasses.add(eClass);
        eTypes.add(eType);
        eCodes.add(eCode);
        eMessages.add(eMessage);

        ExceptionUpdateWrapper wrapper = new ExceptionUpdateWrapper();
        wrapper.setExceptionClass(eClass);
        wrapper.setExceptionType(eType);
        wrapper.setExceptionStatus(eCode);
        wrapper.setExceptionMessage(eMessage);

        return wrapper;
    }

    /**
     * Helper for {@code this.confirmAuthenticator()}. Generates random {@code chars} and adds them to a {@code String}
     * @return
     * 		New authentication key for a {@code Token}
     */
    private String generateAuthenticator() {

        int authLen = 10;

        String key = new String();
        Random rand = new Random();

        for (int i = 0; i < authLen; i++) {

            //generate new chars
            char chToAdd = (char) (rand.nextInt(75) + 48);
            //if toAdd is invalid, generate a new char
            while (!isValidChar(chToAdd)) { chToAdd = (char) (rand.nextInt(75) + 48); }
            //add to string
            String strToAdd = "" + chToAdd;
            key = key.concat(strToAdd);
        }

        return key;
    }

    /**
     * Helper for {@code this.generateAuthenticator()}. Checks if a {@code char} is valid to put into an {@code authenticator}
     * @param c
     * 		{@code char} to check
     * @return
     * 		{@code True} if {@code c} is valid. {@code False} otherwise
     */
    private boolean isValidChar(char c) {

        if (c == '[' || c == '\\' || c == ']' || c == '^' || c == '_' || c == '`') { return false; }
        return true;
    }
}
