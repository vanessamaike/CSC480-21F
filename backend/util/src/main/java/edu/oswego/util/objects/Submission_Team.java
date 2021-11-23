package edu.oswego.util.objects;

public class Submission_Team {

    private int submissionId;
    private int teamId;



    private int assignmentId;

    public Submission_Team(){
        submissionId = 0;
        teamId = 0;
        assignmentId = 0;
    }

    public Submission_Team(int submissionId, int teamID, int assignmentId) {
        this.submissionId = submissionId;
        this.teamId = teamID;
        this.assignmentId = assignmentId;
    }

    public void setTeamId(int i){
        submissionId = i;
    }

    public void setSubmissionId(int i){
        teamId = i;
    }

    public int getTeamId(){
        return teamId;
    }

    public int getSubmissionId(){
        return submissionId;
    }

    public int getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(int assignmentId) {
        this.assignmentId = assignmentId;
    }
}
