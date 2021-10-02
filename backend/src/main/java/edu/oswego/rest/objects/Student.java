package edu.oswego.rest.objects;

public class Student {
    private String studentID;
    private int userID;
    private String firstName;
    private String lastName;
    private String email;
    private int teamID;
    private float score;
    private int courseID;



    public Student(String studentID, int userID, String firstName, String lastName, String email, int teamID, float score, int courseID) {
        this.userID = userID;
        this.studentID = studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.teamID = teamID;
        this.score = score;
        this.courseID = courseID;
    }

    public int getUserID() {
        return userID;
    }

    public String getStudentID() {
        return studentID;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTeamID() {
        return teamID;
    }

    public float getScore() {
        return score;
    }

    public int getCourseID() {
        return courseID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setTeamID(int teamID) {
        this.teamID = teamID;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public void setCourseID(int courseID) {
        this.courseID = courseID;
    }
}
