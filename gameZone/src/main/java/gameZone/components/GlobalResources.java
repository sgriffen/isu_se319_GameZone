package gameZone.components;

import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class GlobalResources {

    private String fileSep;

    private String resourceLoc;

    private String outputLoc;

    public GlobalResources() {

        this.fileSep = File.separator;

        /* sean */
        resourceLoc = "C:" + fileSep + "Users" + fileSep + "Sean" + fileSep + "school" + fileSep + "se319" + fileSep + "g11" + fileSep + "gameZone" + fileSep + "src" + fileSep + "main" + fileSep + "resources" + fileSep;
//        /* jamie */
//      resourceLoc = "gameZone" + fileSep + "src" + fileSep + "main" + fileSep + "resources" + fileSep;
//        /* live */
//        resourceLoc = fileSep + "gameZone" + fileSep + "resources" + fileSep;

        /* sean */
        outputLoc = "C:" + fileSep + "Users" + fileSep + "Sean" + fileSep + "school" + fileSep + "se319" + fileSep + "g11" + fileSep + "gameZone" + fileSep + "output";
//        /* jamie */
//      outputLoc = "gameZone" + fileSep + "src" + fileSep + "main" + fileSep + "resources" + fileSep;
//        /* live */
//        outputLoc = fileSep + "gameZone" + fileSep + "output" + fileSep;
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
}
