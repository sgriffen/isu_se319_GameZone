package gameZone.user;

import gameZone.gameSession.GameSession;

public interface UserInterface {

    /* *************************************************** START GETTERS/SETTERS *************************************************** */

    /**
     * Get {@code id_db} of {@code User}
     * @return
     *      {@code id_db}
     */
    Integer getIdDB();
    /**
     * Set {@code id_db} of {@code User}
     * @param id_db
     *      Desired {@code id_db} for {@code User}
     */
    void setIdDB(int id_db);
    
    /**
     * Get {@code gameSession} of {@code User}
     * @return
     *      {@code gameSession}
     */
    GameSession getGameSession();
    /**
     * Set {@code gameSession} of {@code User}
     * @param gameSession
     *      Desired {@code gameSession} for {@code User}
     */
    void setGameSession(GameSession gameSession);
    
    /**
     * Get {@code id_app} of {@code User}
     * @return {
     *      @code id_app}
     */
    String getIdApp();
    /**
     * Set {@code id_app} of {@code User}
     *
     * @param id_app
     *      Desired {@code id_app} for {@code User}
     */
    void setIdApp(String id_app);

    /**
     * Get {@code wins} of {@code User}
     * @return
     *      {@code wins}
     */
    Integer getWins();
    /**
     * Set {@code wins} of {@code User}
     * @param wins
     *      Desired {@code wins} for {@code User}
     */
    void setWins(int wins);

    /**
     * Get {@code losses} of {@code User}
     * @return
     *      {@code losses}
     */
    Integer getLosses();
    /**
     * Set {@code losses} of {@code User}
     * @param losses
     *      Desired {@code losses} for {@code User}
     */
    void setLosses(int losses);
    
    /**
     * Get {@code place} of {@code User}
     * @return
     *      {@code place}
     */
    Integer getPlace();
    /**
     * Set {@code place} of {@code User}
     * @param place
     *      Desired {@code place} for {@code User}
     */
    void setPlace(Integer place);

    /* **************************************************** END GETTERS/SETTERS **************************************************** */

    /* ***************************************************** START MISC METHODS **************************************************** */

    /**
     * Get the win/loss ratio of this player
     * @return
     *      {@code wins} / {@code losses}
     */
    Double winLossRatio();

    /* ****************************************************** END MISC METHODS ***************************************************** */

    /* ***************************************************** END USER INTERFACE **************************************************** */
}
