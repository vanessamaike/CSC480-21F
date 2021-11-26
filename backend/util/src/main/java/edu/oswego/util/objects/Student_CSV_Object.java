package edu.oswego.util.objects;

public class Student_CSV_Object {
    private String StudentID;
    private String LastName;
    private String FirstName;
    private String MiddleName;
    private String Number;
    private String Degree;
    private String Course;
    private String Email;
    private String Level;
    private String Address;
    public Student_CSV_Object() {
        this.StudentID = "";
        this.LastName = "";
        this.FirstName = "";
        this.MiddleName = "";
        this.Number = "";
        this.Degree = "";
        this.Course = "";
        this.Email = "";
        this.Level = "";
        this.Address = "";
    }
    public Student_CSV_Object(String StudentID, String LastName, String FirstName, String MiddleName
            , String Number, String Degree, String Course, String Email, String Level, String Address) {
        this.StudentID = StudentID;
        this.LastName = LastName;
        this.FirstName = FirstName;
        this.MiddleName = MiddleName;
        this.Number = Number;
        this.Degree = Degree;
        this.Course = Course;
        this.Email = Email;
        this.Level = Level;
        this.Address = Address;
    }


    public String getCourse() {
        return Course;
    }

    public void setCourse(String course) {
        this.Course = course;
    }
    public String getStudentID() {
        return StudentID;
    }

    public void setStudentID(String studentID) {
        this.StudentID = studentID;
    }

    public String getLastName() {
        return this.LastName;
    }

    public void setLastName(String lastName) {
        this.LastName = lastName;
    }

    public String getFirstName() {
        return this.FirstName;
    }

    public void setFirstName(String firstName) {
        this.FirstName = firstName;
    }

    public String getMiddleName() {
        return this.MiddleName;
    }

    public void setMiddleName(String middleName) {
        this.MiddleName = middleName;
    }

    public String getNumber() {
        return this.Number;
    }

    public void setNumber(String number) {
        this.Number = number;
    }

    public String getDegree() {
        return this.Degree;
    }

    public void setDegree(String degree) {
        this.Degree = degree;
    }

    public String getEmail() {
        return this.Email;
    }

    public void setEmail(String email) {
        this.Email = email;
    }

    public String getLevel() {
        return this.Level;
    }

    public void setLevel(String level) {
        this.Level = level;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        this.Address = address;
    }
}
