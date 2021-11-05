package edu.oswego.util.objects;

public class Student{
    private String studentID;
    private int userID;
    private String firstName;
    private String lastName;
    private String email;


    public Student() {
        this.userID = 0;
        this.studentID = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
    }

    public Student(String studentID, int userID, String firstName, String lastName, String email) {
        this.userID = userID;
        this.studentID = studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
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

}
