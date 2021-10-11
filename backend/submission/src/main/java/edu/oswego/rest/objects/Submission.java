package edu.oswego.rest.objects;

import java.util.Date;

public class Submission {
   // private final DatabaseInterface dbi = new DatabaseInterface();

    private int teamID;
    private String signOff;
    private String pdfDoc;
    private int submissionID;

    public Submission(int submissionID , String pdfDoc, String signOff, int teamID ){
        this.teamID = teamID;
        this.signOff = signOff;
        this.pdfDoc = pdfDoc;
        this.submissionID = submissionID;
    }


    public Submission(){
        this.submissionID = 1;
        this.teamID = 0;
        this.signOff = "";
        this.pdfDoc = "";
    }

    public int getSubmissionID() {
        return submissionID;
    }

    public int getTeamID() {
        return teamID;
    }

    public String getPdfDoc() { return pdfDoc;}

    public String getSignOff() { return signOff;}

    public void setTeamID(int teamID) {
        this.teamID = teamID;
    }

    public void setSignOff(String signOff) {
        this.signOff = signOff;
    }

    public void setPdfDoc(String pdfDoc) {
        this.pdfDoc = pdfDoc;
    }

    public void setSubmissionID(int submissionID) {
        this.submissionID = submissionID;
    }
}
