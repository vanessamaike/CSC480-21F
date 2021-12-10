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
    private static final String commonPath = "src"+fs+"main"+fs+"resources"+fs+"META-INF"+fs;
    private static final String loginPath = "backend"+fs+"Login-microservice"+fs;
    private static final String profePath = "backend"+fs+"Professor-microservice"+fs;
    private static final String studePath = "backend"+fs+"Student-microservice"+fs;
    private static final String utiliPath = "backend"+fs+"Utility-microservice"+fs;
    private static final String utildPath = "backend"+fs+"util"+fs;
    private static final String filename = "microprofile-properties.config";

    private static final String configContents = "config_ordinal=100\n" +
            "\n" +
            "edu.oswego.rest.util.utility.from = peerreview21@gmail.com\n" +
            "edu.oswego.rest.util.utility.password = password\n" +
            "edu.oswego.rest.util.utility.host = smtp.gmail.com\n" +
            "\n" +
            "edu.oswego.rest.util.objects.authObject.CLIENT_ID = \n" +
            "\n" +
            "edu.oswego.util.dao.impl.AbstractDAO.url = jdbc:mysql://pi.cs.oswego.edu:3306/21F_peerset\n" +
            "edu.oswego.util.dao.impl.AbstractDAO.user = peerset_user\n" +
            "edu.oswego.util.dao.impl.AbstractDAO.password = password\n" +
            "\n" +
            "edu.oswego.rest.util.utility.SD.dev = ";

    /**
     * The args will be either length 1 or 2, otherwise print help message and exit.
     * @param args The command line arguments.
     */
    public static void main(String[] args){

        String helpMessage = "This script helps manage the PeerSet server." +
                "\n\tThese are the following options for the syntax \"./launcher.sh [options]\":" +

                "\n\t\"./launcher.sh --h\" : " + "Displays this help message and restores the config file." +

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

            makeConfig();
            System.exit(1);
        }
        makeConfig();
        //putConfigs(makeConfig());

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
                    makeConfig();
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
            if(useMe.findOneWithEmail(email)==null) user = useMe.save(user);
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
     */
    public static void makeConfig(){

        File thisAbsPath = new File("");
        String absPath = thisAbsPath.getAbsolutePath();
        int backendIndex = absPath.indexOf("backend");
        File f = new File(absPath.substring(0,backendIndex)+filename);

        if(!f.exists()){
            try {
                if(f.createNewFile()) {
                    FileWriter fw = new FileWriter(f);
                    fw.write(configContents);
                    fw.flush();
                    fw.close();
                    System.out.println("The configuration file has been reborn.");
                    System.out.println("It lives at "+f.getAbsolutePath());
                    System.out.println("Please make sure the config file has the correct settings.");
                    System.out.println("PeerSet will now exit.");
                    System.exit(1);
                }
            } catch (IOException e) {
                System.out.println("Something went wrong when restoring the config file.");
                e.printStackTrace();
                System.out.println("\nTo manually restore the config file, place the following output" +
                        "\ninto a file named '"+filename+"' in this directory:\n"+configContents);
                System.exit(1);
            }
        }
    }

}
