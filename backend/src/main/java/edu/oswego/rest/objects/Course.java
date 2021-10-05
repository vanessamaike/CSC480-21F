package edu.oswego.rest.objects;

import java.util.Date;
import com.google.gson.*;

/**
 * @author Phoenix
 * This class represents the course object. It keeps track of the course ID, the
 * name of the course, the code of the course, the date the course ends, as well
 * as a String that represents the settings present for the course.
 */
public class Course {

    private final int courseID;
    private final String name;
    private final String title;
    private final String code;
    private final Date endDate;
    private String settings;



    /**
     * This constructor is used to generate a course that does not yet exist in the database.
     * The course does not insert itself into the database, as a case may exist where a course
     * is created, but does not need to be inserted.
     * @param courseID The unique integer that is the course ID. 0 if new course.
     * @param name The name provided for the course.
     * @param code The code provided for the course.
     * @param endDate The date the course ends.
     * @param settings A string representation of the settings for the course.
     */
    public Course(int courseID, String title, String name, String code, Date endDate, String settings){
        this.name = name;
        this.title = title;
        this.code = code;
        this.endDate = endDate;
        this.settings = settings;
        this.courseID = courseID;
    }


    public Course(){
        this.courseID = 0;
        this.title = "";
        this.name = "";
        this.code = "";
        this.endDate = null;
        this.settings = "";
    }

    public int getCourseID() {
        return courseID;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public Date getEndDate() {
        return endDate;
    }

    public String getTitle() {
        return title;
    }
    /**
     * This returns the entire set of user settings.
     * @return The string that represents the user settings.
     */
    public String getSettings(){
        return settings;
    }

    /**
     * This method returns the character representing the user setting at the index given.
     * @param index The index from which the setting is to be retrieved.
     * @return The character representing the user setting.
     */
    public char getSetting(int index){
        if(index < settings.length()) return settings.charAt(index);
        else return 0;
    }

    /**
     * This method updates the settings for a course.
     * @param index The index at which the setting is in the string.
     * @param setting The updated setting.
     * @return True upon completion.
     */
    public boolean updateSetting(int index, char setting){
        String firstHalf = "";
        if(index-1>0) firstHalf = settings.substring(0, index-1);
        String lastHalf = "";
        if(index+1<settings.length()) lastHalf = settings.substring(index+1);
        settings = firstHalf+setting+lastHalf;
        return true;
    }

    /**
     * This method updates all the settings for a course.
     * @param settings The new settings string.
     * @return True upon completion.
     */
    public boolean updateAllSettings(String settings){
        this.settings = settings;
        return true;
    }

}
