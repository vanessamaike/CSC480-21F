package edu.oswego.util.utility;

import edu.oswego.util.objects.User;
import edu.oswego.util.service.impl.UserService;

import java.io.*;
import java.util.Scanner;

/**
 * @author Phoenix Boisnier
 * This handles startup, shutdown, config generation, and authorized professor management for
 * PeerSet.
 */
public class Configure {

    private static final UserService useMe = new UserService();

    private static final String fs = System.getProperty("file.separator");
    private static final String commonPath = "src"+fs+"main"+fs+"resources"+fs+"META-INF"+fs+"";
    private static final String loginPath = "backend"+fs+"Login-microservice"+fs+"";
    private static final String profePath = "backend"+fs+"Professor-microservice"+fs+"";
    private static final String studePath = "backend"+fs+"Student-microservice"+fs+"";
    private static final String utiliPath = "backend"+fs+"Utility-microservice"+fs+"";
    private static final String filename = "microprofile-properties.config";
    //TODO fill out the config contents.
    private static final String configContents = "this-is-a-variable=true";

    /**
     * The args will be either length 1 or 2, otherwise print help message and exit.
     * @param args The command line arguments.
     */
    public static void main(String[] args){

        String helpMessage = "This script helps manage the PeerSet server." +
                "\n\tThese are the following options for the syntax \"./launcher.sh [options]\":" +
                "\n\t\"./launcher.sh --h\" : " + "Displays this help message." +
                "\n\t\"./launcher.sh run\" : Runs PeerSet with the current configurations." +
                "\n\t\"./launcher.sh end\" : Ends PeerSet, ready to start again later." +
                "\n\t\"./launcher.sh allow <filepath>\" : Creates user accounts with the professor role" +
                "\n\t\tusing the file specified by <filepath>. This file must contain exactly one Gmail" +
                "\n\t\temail address on each line in the file. The Gmail email addresses specified " +
                "\n\t\twill then be authorized as professors in the PeerSet webapp." +
                "\n\t\"./launcher.sh remove <filepath>\" : Deletes user accounts with the professor role" +
                "\n\t\tusing the file specified by <filepath>. This file must contain exactly one Gmail" +
                "\n\t\temail address on each line in the file. The Gmail email addresses specified " +
                "\n\t\twill then be de-authorized as professors from the PeerSet webapp." +
                "";

        if(args.length!=1 && args.length!=2) {
            System.out.println("Incorrect number of arguments. Required: 1 or 2.");
            System.out.println(helpMessage);
            System.exit(1);
        }
        putConfigs(makeConfig());
        if(args.length==1){
            switch (args[0]){
                case "run":{
                    System.out.println("Beginning PeerSet...");
                    break;
                }
                case "end":{
                    System.out.println("Ending PeerSet...");
                    break;
                }
                default:{
                    System.out.println(helpMessage);
                }
            }
        }
        if(args.length==2){
            String filepath = args[1];
            switch (args[0]){
                case "allow":{
                    System.out.println("Adding professor accounts using the file \n"+filepath);
                    File f = new File(filepath);
                    try {
                        Scanner scone = new Scanner(f);
                        System.out.println("Adding professors...");
                        while (scone.hasNext()){
                            addProfessor(scone.nextLine().trim());
                        }
                        scone.close();
                    } catch (FileNotFoundException e) {
                        manualManipulation(true, filepath);
                    }
                    System.out.println("Professors have been added!");
                    break;
                }
                case "remove":{
                    System.out.println("Removing professor accounts using the file \n"+filepath);
                    File f = new File(filepath);
                    try {
                        Scanner scone = new Scanner(f);
                        System.out.println("Removing professors...");
                        while (scone.hasNext()){
                            removeProfessor(scone.nextLine().trim());
                        }
                        scone.close();
                    } catch (FileNotFoundException e) {
                        manualManipulation(false, filepath);
                    }
                    System.out.println("Professors have been removed!");
                    break;
                }
                default:{
                    System.out.println(helpMessage);
                }
            }
        }

    }

    /**
     * This method offers a manual method of handling professor creation in the event the scanner
     * cannot connect, or the file cannot be found.
     * @param adding True if adding professors, else false.
     * @param filePath The filepath that cause this to happen, so that it may be shamed.
     */
    private static void manualManipulation(boolean adding, String filePath){
        System.out.print("The file could not be found for the path " +filePath+". Would you like to ");
        if(adding) System.out.print("add");
        else System.out.print("remove");
        System.out.println(" professors manually? y/n");
        Scanner scone = new Scanner(System.in);
        if(scone.nextLine().equalsIgnoreCase("y")) {
            System.out.println("Editing professors manually. Press 'q' followed by the 'enter' key to finish.");
            System.out.println("Enter the first professor's email address:");
            String input = scone.nextLine();
            while(!input.equalsIgnoreCase("q")){
                if(adding) addProfessor(input);
                else removeProfessor(input);
                System.out.println("Enter the next professor's email (or 'q' to quit):");
                input = scone.nextLine();
            }
            System.out.println("Professor account editing has been completed.");
        }
        else {
            System.out.println("You have not selected (y)es. Please try again with a new file.");
            System.exit(1);
        }
    }

    /**
     * This method adds a professor if they are not already in the database.
     * @param email The new professor's gmail email address.
     */
    private static void addProfessor(String email){
        try{
            User user = new User(0, email, "professor", "");
            if(useMe.findOneWithEmail(email)!=null) user = useMe.save(user);
            if(user==null) System.out.println("Could not create an account for "+email+".");
            else System.out.println("Professor account created for "+email+".");
        } catch (Exception e){
            System.out.println("Something went wrong.");
            e.printStackTrace();
        }

    }

    /**
     * This method removes a professor.
     * @param email The new professor's gmail email address.
     */
    private static void removeProfessor(String email){
        try{
            User user = new User(0, email, "professor", "");
            useMe.delete(user);
            System.out.println("Professor account deleted for "+email+".");
        } catch (Exception e){
            System.out.println("Something went wrong.");
            e.printStackTrace();
        }
    }

    /**
     * This method creates a new config file if one does not exist.
     * This new config file will have the default settings.
     * @return The config file
     */
    private static File makeConfig(){
        File f = new File(".."+fs+".."+fs+".."+fs+".."+fs+""+filename);
        if(!f.exists()){
            try {
                if(f.createNewFile()) {
                    FileWriter fw = new FileWriter(f);
                    fw.write(configContents);
                    fw.flush();
                    fw.close();
                    System.out.println("The configuration file has been reborn.");
                }
            } catch (IOException e) {
                System.out.println("Something went wrong when restoring the config file.");
                e.printStackTrace();
                System.out.println("\nTo manually restore the config file, place the following output" +
                        "\ninto a file named '"+filename+"' in this directory:\n"+configContents);
                System.exit(1);
            }
        }
        return f;
    }

    /**
     * This method puts the config files in the right spots.
     * @param configFile The config file.
     */
    private static void putConfigs(File configFile){
        try{
            StringBuilder manConfig = new StringBuilder();
            Scanner scone = new Scanner(configFile);
            while(scone.hasNext()) manConfig.append(scone.nextLine());
            scone.close();

            File thisAbsPath = new File("");
            String absPath = thisAbsPath.getAbsolutePath();
            int backendIndex = absPath.indexOf("backend"+fs+"");
            File loginConfig = new File(absPath.substring(0,backendIndex)+loginPath+commonPath+filename);
            File profeConfig = new File(absPath.substring(0,backendIndex)+profePath+commonPath+filename);
            File studeConfig = new File(absPath.substring(0,backendIndex)+studePath+commonPath+filename);
            File utiliConfig = new File(absPath.substring(0,backendIndex)+utiliPath+commonPath+filename);

            if(!loginConfig.exists()) System.out.println("LoginConfig: "+loginConfig.createNewFile());
            if(!profeConfig.exists()) System.out.println("ProfessorConfig: "+profeConfig.createNewFile());
            if(!studeConfig.exists()) System.out.println("StudentConfig: "+studeConfig.createNewFile());
            if(!utiliConfig.exists()) System.out.println("UtilityConfig: "+utiliConfig.createNewFile());

            FileWriter loginWrite = new FileWriter(loginConfig);
            FileWriter profeWrite = new FileWriter(profeConfig);
            FileWriter studeWrite = new FileWriter(studeConfig);
            FileWriter utiliWrite = new FileWriter(utiliConfig);

            loginWrite.write(manConfig.toString());
            loginWrite.flush();
            loginWrite.close();

            profeWrite.write(manConfig.toString());
            profeWrite.flush();
            profeWrite.close();

            studeWrite.write(manConfig.toString());
            studeWrite.flush();
            studeWrite.close();

            utiliWrite.write(manConfig.toString());
            utiliWrite.flush();
            utiliWrite.close();

        }
        catch (IOException e) {
            System.out.println("Something went wrong copying the configuration file.");
            e.printStackTrace();
            System.exit(1);
        }
    }

}
