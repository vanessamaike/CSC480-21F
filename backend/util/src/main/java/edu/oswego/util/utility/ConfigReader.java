package edu.oswego.util.utility;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Scanner;

/**
 * @author Phoenix Boisnier
 * This class reads the config file for the util folder since normal injection didn't seem to
 * want to work, and we're running out of time. This class reads the file contents, parses them
 * and then makes them available à la hash map.
 */
public class ConfigReader {

    private final HashMap<String, String> imports;
    private static final String fs = System.getProperty("file.separator");

    /**
     * It's a constructor.
     */
    public ConfigReader(){
        Configure.makeConfig();
        File thisAbsPath = new File("");
        String absPath = thisAbsPath.getAbsolutePath();
        int backendIndex = absPath.indexOf("backend");
        File f = new File(absPath.substring(0,backendIndex)+"microprofile-properties.config");
        //File f = new File(".."+fs+".."+fs+".."+fs+".."+fs+"microprofile-properties.config");
        //File f = new File(abs.getAbsolutePath() + fs + "META-INF" + fs + "microprofile-properties.config");
        imports = parse(f);
    }

    /**
     * This method parses the config file.
     * @param f The file being parsed.
     * @return The hash map built from the file.
     */
    private HashMap<String, String> parse(File f){
        HashMap<String, String> zults = new HashMap<>();

        try {
            Scanner scone = new Scanner(f);
            while(scone.hasNext()) {
                String line = scone.nextLine();
                String trim = line.substring(line.indexOf("=") + 1).trim();
                if(line.contains("edu.oswego.rest.util.utility.from")){
                    zults.put("edu.oswego.rest.util.utility.from", trim);
                }
                else if(line.contains("edu.oswego.rest.util.utility.password")){
                    zults.put("edu.oswego.rest.util.utility.password", trim);
                }
                else if(line.contains("edu.oswego.rest.util.utility.host")){
                    zults.put("edu.oswego.rest.util.utility.host", trim);
                }
                else if(line.contains("edu.oswego.rest.util.objects.authObject.CLIENT_ID")){
                    zults.put("edu.oswego.rest.util.objects.authObject.CLIENT_ID", trim);
                }
                else if(line.contains("edu.oswego.util.dao.impl.AbstractDAO.url")){
                    zults.put("edu.oswego.util.dao.impl.AbstractDAO.url", trim);
                }
                else if(line.contains("edu.oswego.util.dao.impl.AbstractDAO.user")){
                    zults.put("edu.oswego.util.dao.impl.AbstractDAO.user", trim);
                }
                else if(line.contains("edu.oswego.util.dao.impl.AbstractDAO.password")){
                    zults.put("edu.oswego.util.dao.impl.AbstractDAO.password", trim);
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("The scanner has failed to attach to the config file.");
            e.printStackTrace();
        }

        return zults;
    }

    /**
     * This method wraps HashMap.get(key) to restrict access to HashMap.put(key, value).
     * @param key The hash map's key for the expected value.
     * @return The value as a string (may need to use parseInt, parseDouble, etc.).
     */
    public String getValueAsString(String key){
        return imports.get(key);
    }
}
