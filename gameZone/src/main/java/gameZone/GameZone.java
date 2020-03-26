package gameZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * {@code GameZone} startup class
 */
@SpringBootApplication
public class GameZone {

    /**
     * Main method for {@code GameZone}
     * <br>
     * Call to start the application
     * @param args
     * 		Any {@code String} arguments to specify runtime rules
     * 		<br>
     * 		Currently, there are none
     */
    public static void main(String[] args) {
        SpringApplication.run(GameZone.class, args);
    }
}
