package edu.oswego.rest.objects;

public class Review {

    private int teamID;
    private String signOff;
    private String pdfDoc;
    private int reviewID;

    public Review(int reviewID , String pdfDoc, String signOff, int teamID ){
        this.teamID = teamID;
        this.signOff = signOff;
        this.pdfDoc = pdfDoc;
        this.reviewID = reviewID;
    }

    /**
     * This constructor is used to generate a submission that already exists in the database.
     * @param reviewID The submission ID for the submission.
     */
    public Review(int reviewID){
        Review review = null ;
        if(review!=null){
            this.reviewID = reviewID;
            this.pdfDoc = review.pdfDoc;
            this.signOff = review.signOff;
            this.teamID = review.teamID;
        }
        else {
            this.reviewID = 1;
            this.teamID = 0;
            this.signOff = "";
            this.pdfDoc = "";
        }
    }

    public int getReviewID() {
        return reviewID;
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

    public void setReviewID(int reviewID) {
        this.reviewID = reviewID;
    }
}
