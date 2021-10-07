package edu.oswego.rest.objects;

public class Answer {

    private int answerID;
    private int questionID;
    private int submissionID;
    private String answer;
    private float score;
    private float possible;

    public Answer(){
        this.answerID = 0;
        this.questionID = 0;
        this.submissionID = 0;
        this.answer = "";
        this.score = 0.0f;
        this.possible = 0.0f;
    }

    public Answer(int answerID, int questionID, int submissionID, String answer, float score, float possible) {
        this.answerID = answerID;
        this.questionID = questionID;
        this.submissionID = submissionID;
        this.answer = answer;
        this.score = score;
        this.possible = possible;
    }


    public int getAnswerID() {
        return answerID;
    }

    public int getQuestionID() {
        return questionID;
    }

    public int getSubmissionID() {
        return submissionID;
    }

    public String getAnswer() {
        return answer;
    }

    public float getScore() {
        return score;
    }

    public float getPossible() {
        return possible;
    }

    public void setAnswerID(int answerID) {
        this.answerID = answerID;
    }

    public void setQuestionID(int questionID) {
        this.questionID = questionID;
    }

    public void setSubmissionID(int submissionID) {
        this.submissionID = submissionID;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public void setPossible(float possible) {
        this.possible = possible;
    }

}
