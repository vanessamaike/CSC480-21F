package edu.oswego.util.objects;

import javax.json.bind.annotation.JsonbDateFormat;
import java.time.LocalDateTime;

public class Review {

    private int teamID;
    private String signOff;
    private byte[] pdfDoc;
    private int reviewID;
    private String comments;
    @JsonbDateFormat(value = "MM-dd-yyyy'T'HH:mm:ss")
    private LocalDateTime submissionTime;
    private boolean seen;
    private int assId;


    public Review(int reviewID , String comments,
                  LocalDateTime submissionTime , byte[] pdfDoc,
                  String signOff, int teamID, boolean seen, int assId){
        this.teamID = teamID;
        this.signOff = signOff;
        this.pdfDoc = pdfDoc;
        this.reviewID = reviewID;
        this.comments = comments;
        this.submissionTime = submissionTime;
        this.seen = seen;
        this.assId = assId;
    }

    public Review(){
        this.reviewID = 0;
        this.teamID = 0;
        this.signOff = "";
        this.pdfDoc = new byte[]{};
        this.comments = "";
        this.submissionTime = LocalDateTime.now();
        this.seen = false;
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

    public void setAssignmentId(int id){
        this.assId = id;
    }

    public int getAssignmentId(){
        return assId;
    }
}
