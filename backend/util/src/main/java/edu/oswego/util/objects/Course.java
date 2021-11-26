package edu.oswego.util.objects;

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
    private int userID;
    private  String title;
    private  String code;
    private String sectionNumber;
    private  LocalDate endDate;
    private String settings;
    private boolean isTeamed;

    private String semester;

    public Course(int courseID, int userID, String title, String code, String sectionNumber, LocalDate endDate, String settings, boolean teamed , String semester){
        this.title = title;
        this.userID = userID;
        this.code = code;
        this.sectionNumber = sectionNumber;
        this.endDate = endDate;
        this.settings = settings;
        this.courseID = courseID;
        this.isTeamed = teamed;
        this.semester = semester;
    }


    public Course(){
        this.courseID = 0;
        this.userID = 0;
        this.title = "";
        this.code = "";
        this.sectionNumber = "";
        this.endDate = LocalDate.now();
        this.settings = "";
        this.isTeamed = false;
        this.semester = "";
    }

    public String getSectionNumber() {
        return sectionNumber;
    }

    public void setSectionNumber(String sectionNumber) {
        this.sectionNumber = sectionNumber;
    }


    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
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
    public boolean isTeamed() {
        return isTeamed;
    }

    public void setTeamed(boolean teamed) {
        this.isTeamed = teamed;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

}
