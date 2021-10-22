package edu.oswego.rest.objects;

public class Submission {
    private int teamID;
    private String signOff;
    private byte[] pdfDoc;
    private int submissionID;

    public Submission(int submissionID , byte[] pdfDoc, String signOff, int teamID ){
        this.teamID = teamID;
        this.signOff = signOff;
        this.pdfDoc = pdfDoc;
        this.submissionID = submissionID;
    }


    public Submission(){
        this.submissionID = 1;
        this.teamID = 0;
        this.signOff = "";
        this.pdfDoc = new byte[]{};
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
}
