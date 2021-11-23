package edu.oswego.util.objects;

public class Course_Team_Student {

    private int userId;
    private int teamId;
    private int courseId;

    public Course_Team_Student(){
        this.userId = 0;
        this.courseId = 0;
        this.teamId = 0;
    }

    public Course_Team_Student(int userId, int courseId, int teamId){
        this.userId = userId;
        this.courseId = courseId;
        this.teamId = teamId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

}
