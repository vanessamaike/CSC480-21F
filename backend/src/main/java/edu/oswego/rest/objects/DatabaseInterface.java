package edu.oswego.rest.objects;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import javax.ws.rs.NotFoundException;
import java.sql.*; //TODO figure out if we're using SQL or MongoDB
import java.util.ArrayList;

//TODO This is a work in progress class. Many methods do nothing currently.
/**
 * @author Phoenix
 * This class is intended to connect with the database server in a way such that login credentials
 * and other sensitive information do not need to be sent to a microservice over the network
 * before connecting to the database.
 *
 * Currently, much of this class does nothing and is a work-in-progres.
 */
public class DatabaseInterface {

    //TODO will need to double check these
    private static String user;
    private static String pass;
    private static InitialContext ctx;
    private static DataSource ds;
    static {
        try {
            ctx = new InitialContext();
            //TODO I don't know if this URI will be correct
            ds = (DataSource)ctx.lookup("jdbc/myDB");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    //TODO update these later when we know what they are going to be, and if we need them
    private static final String jdbc = "com.mysql.jdbc.Driver";
    private static final String studURL = "jdbc:mysql://";
    private static final String acctURL = "jdbc:mysql://";
    private static final String courURL = "jdbc:mysql://";
    private static final String assgURL = "jdbc:mysql://";
    private static final String submURL = "jdbc:mysql://";

    /**
     * Creates a database object. At some point during the program setup, login will need to be called.
     */
    public DatabaseInterface(){
    }

    /**
     * This method takes the credentials for the database.
     * @param user The username.
     * @param pass The password.
     */
    public void login(String user, String pass){
        //TODO this method would be called when we get the command line variables during setup
        DatabaseInterface.user = user;
        DatabaseInterface.pass = pass;
    }

    /**
     * This method removes characters used for SQL injection.
     * @param query The query being made.
     * @return The query with less injection.
     */
    private String sanitize(String query){
        //TODO apply this to all of the incoming string values that are passed into the DB.
        return query;
    }

    /**
     * Updates the course in the database with the information in the course object.
     * @param course The course object being updated.
     * @return True if the operation completed successfully.
     */
    public boolean updateCourse(Course course){
        //TODO sanitize course values
        //TODO
        /*
        try {
            Connection c = ds.getConnection();
            Statement s = c.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
         */
        return true;
    }

    /**
     * Returns a course object from the database.
     * @param courseID The integer ID of the course to be retrieved.
     * @return The course object generated from the database information.
     */
    public Course getCourse(int courseID) throws NotFoundException {
        //TODO sanitize?
        //"SELECT * FROM courses WHERE CourseID="+courseID
        //TODO
        //This line can be deleted once the database lookup is done.
        Course c = null;
        return c;
    }

    /**
     * This method removes the course from the courses table with the matching ID.
     * @param courseID The ID of the course to be removed.
     * @return True upon completion.
     */
    public boolean removeCourse(int courseID){
        //TODO sanitize?
        //"DELETE * FROM courses WHERE CourseID="+courseID
        //TODO
        return true;
    }

    /**
     * This method returns the array of student IDs that exist for that course
     * @param courseID The course's students' IDs that we need.
     * @return The array of students' IDs.
     */
    public int[] getStudentsInCourse(int courseID){
        //TODO
        //"SELECT userID FROM students WHERE courseID="+courseID
        ArrayList<Integer> sids = new ArrayList<>();
        //Store results in the array list
        int[] ids = new int[sids.size()];
        for(int q = 0; q < sids.size(); q++){
            ids[q] = sids.get(q);
        }
        return ids;
    }

}
