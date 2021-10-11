package edu.oswego.rest.objects;

import java.time.LocalDate;
import java.util.Date;
import com.google.gson.*;

/**
 * @author Phoenix
 * This class represents the course object. It keeps track of the course ID, the
 * name of the course, the code of the course, the date the course ends, as well
 * as a String that represents the settings present for the course.
 */
public class Course {


    private  int courseID;
    private  String title;
    private  String code;
    private  LocalDate endDate;
    private String settings;

    public Course(int courseID, String title, String code, LocalDate endDate, String settings){
        this.title = title;
        this.code = code;
        this.endDate = endDate;
        this.settings = settings;
        this.courseID = courseID;
    }


    public Course(){
        this.courseID = 0;
        this.title = "";
        //this.name = "";
        this.code = "";
        this.endDate = LocalDate.now();
        this.settings = "";
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }

    public void setCourseID(int courseID) {
        this.courseID = courseID;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }


    public int getCourseID() {
        return courseID;
    }


    public String getCode() {
        return code;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getTitle() {
        return title;
    }

    public String getSettings(){
        return settings;
    }

    public char getSetting(int index){
        if(index < settings.length()) return settings.charAt(index);
        else return 0;
    }

    public boolean updateSetting(int index, char setting){
        String firstHalf = "";
        if(index-1>0) firstHalf = settings.substring(0, index-1);
        String lastHalf = "";
        if(index+1<settings.length()) lastHalf = settings.substring(index+1);
        settings = firstHalf+setting+lastHalf;
        return true;
    }


    public boolean updateAllSettings(String settings){
        this.settings = settings;
        return true;
    }

}
