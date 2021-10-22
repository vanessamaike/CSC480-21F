package edu.oswego.rest.objects;

public class Review {

    private int teamID;
    private String signOff;
    private byte[] pdfDoc;
    private int reviewID;

    public Review(int reviewID , byte[] pdfDoc, String signOff, int teamID ){
        this.teamID = teamID;
        this.signOff = signOff;
        this.pdfDoc = pdfDoc;
        this.reviewID = reviewID;
    }

    public Review(){
        this.reviewID = 0;
        this.teamID = 0;
        this.signOff = "";
        this.pdfDoc = new byte[]{};
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
}
