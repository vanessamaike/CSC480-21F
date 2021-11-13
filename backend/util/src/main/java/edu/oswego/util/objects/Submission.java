package edu.oswego.util.objects;

import javax.json.bind.annotation.JsonbDateFormat;
import java.time.LocalDateTime;

public class Submission {
    private int teamID;
    private String signOff;
    private byte[] pdfDoc;
    private int submissionID;
    private String comments;
    @JsonbDateFormat(value = "MM-dd-yyyy'T'HH:mm:ss")
    private LocalDateTime submissionTime;
    private boolean seen;
    private String listOfQCWordViolations;
    private int assId;

    public Submission(int submissionID , String comments,
                      LocalDateTime submissionTime , byte[] pdfDoc,
                      String signOff, int teamID , boolean seen, String v, int assId ){
        this.teamID = teamID;
        this.signOff = signOff;
        this.pdfDoc = pdfDoc;
        this.submissionID = submissionID;
        this.comments = comments;
        this.submissionTime = submissionTime;
        this.seen = seen;
        this.listOfQCWordViolations = v;
        this.assId = assId;
    }


    public Submission(){
        this.submissionID = 1;
        this.teamID = 0;
        this.signOff = "";
        this.pdfDoc = new byte[]{};
        this.comments = "";
        this.submissionTime = LocalDateTime.now();
        this.seen = false;
    }

    public int getSubmissionID() {
        return submissionID;
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

    public void setSubmissionID(int submissionID) {
        this.submissionID = submissionID;
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

    public void setListOfQCWordViolations(String v){
        this.listOfQCWordViolations = v;
    }

    public String getListOfQCWordViolations(){
        return listOfQCWordViolations;
    }

    public int getAssignmentId() {
        return assId;
    }
}
