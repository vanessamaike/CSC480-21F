package edu.oswego.rest.objects;

public class Question {
    private int questionID;
    private int assignmentID;
    private String question;
    private int value;

    public Question () {
        this.questionID = 0;
        this.assignmentID = 0;
        this.question = "";
        this.value = 0;
    }

    public Question(int questionID, int assignmentID, String question, int value) {
        this.questionID = questionID;
        this.assignmentID = assignmentID;
        this.question = question;
        this.value = value;
    }

    public int getQuestionID() {
        return questionID;
    }

    public void setQuestionID(int questionID) {
        this.questionID = questionID;
    }

    public int getAssignmentID() {
        return assignmentID;
    }

    public void setAssignmentID(int assignmentID) {
        this.assignmentID = assignmentID;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
