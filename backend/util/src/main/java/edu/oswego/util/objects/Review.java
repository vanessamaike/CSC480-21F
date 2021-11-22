package edu.oswego.util.objects;

import javax.json.bind.annotation.JsonbDateFormat;
import java.time.LocalDateTime;

public class Review {

    private int teamID;
    private String signOff;
    private byte[] pdfDoc;
    private int reviewID;
    private String comments;
    @JsonbDateFormat(value = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime submissionTime;
    private boolean seen;
    private int assignmentID;


    private int submissionID;
    private String listOfQCWordViolations;
    private  boolean SDCheck;
    private int score;


    public Review(int reviewID , String comments,
                  LocalDateTime submissionTime , byte[] pdfDoc,
                  String signOff, int teamID, boolean seen, int assignmentID,
                  int submissionID, String listOfQCWordViolations,
                  boolean SDCheck,int score ){
        this.teamID = teamID;
        this.signOff = signOff;
        this.pdfDoc = pdfDoc;
        this.reviewID = reviewID;
        this.comments = comments;
        this.submissionTime = submissionTime;
        this.seen = seen;
        this.assignmentID = assignmentID;
        this.submissionID = submissionID;
        this.listOfQCWordViolations = listOfQCWordViolations;
        this.SDCheck = SDCheck;
        this.score = score;
    }

    public Review(){
        this.reviewID = 0;
        this.teamID = 0;
        this.signOff = "";
        this.pdfDoc = new byte[]{};
        this.comments = "";
        this.submissionTime = LocalDateTime.now();
        this.seen = false;
        this.assignmentID = 0;
        this.submissionID = 0;
        this.listOfQCWordViolations = "";
        this.SDCheck = false;
        this.score = 0;
    }

    public int getReviewID() {
        return reviewID;
    }

    public int getTeamID() {
        return teamID;
    }

    public byte[] getPdfDoc() { return pdfDoc;}

    public String getSignOff() { return signOff;}
    public void setTeamID(int teamID) {
        this.teamID = teamID;
    }

    public void setSignOff(String signOff) {
        this.signOff = signOff;
    }

    public void setPdfDoc(byte[] pdfDoc) {
        this.pdfDoc = pdfDoc;
    }

    public void setReviewID(int reviewID) {
        this.reviewID = reviewID;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalDateTime getSubmissionTime() {
        return submissionTime;
    }

    public void setSubmissionTime(LocalDateTime submissionTime) {
        this.submissionTime = submissionTime;
    }
    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }

    public void setAssignmentID(int id){
        this.assignmentID = id;
    }

    public int getAssignmentID(){
        return assignmentID;
    }

    public int getSubmissionID() {
        return submissionID;
    }

    public void setSubmissionID(int submissionID) {
        this.submissionID = submissionID;
    }

    public String getListOfQCWordViolations() {
        return listOfQCWordViolations;
    }

    public void setListOfQCWordViolations(String listOfQCWordViolations) {
        this.listOfQCWordViolations = listOfQCWordViolations;
    }

    public boolean isSDCheck() {
        return SDCheck;
    }

    public void setSDCheck(boolean SDCheck) {
        this.SDCheck = SDCheck;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
