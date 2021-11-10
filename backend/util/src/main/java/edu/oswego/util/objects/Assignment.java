package edu.oswego.util.objects;

import javax.json.bind.annotation.JsonbDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

public class Assignment {

        private int assignmentID;
        private String title;
        private boolean isTeamed;
        private boolean reviewStage;
        private int courseID;
        private byte[] solutionPdfDoc;
        private byte[] peerReviewPdfDoc;
        private String settings;
        private boolean isDraft;

        @JsonbDateFormat(value = "MM-dd-yyyy'T'HH:mm:ss")
        private LocalDateTime publishDateTime;
        @JsonbDateFormat(value = "MM-dd-yyyy'T'HH:mm:ss")
        private LocalDateTime solutionDueDateTime;
        @JsonbDateFormat(value = "MM-dd-yyyy'T'HH:mm:ss")
        private LocalDateTime peerReviewDueDateTime;

        public Assignment(int assignmentID, String title, boolean isTeamed,
                          boolean reviewStage, int courseID, byte[] solutionPdfDoc,
                          byte[] peerReviewPdfDoc, String settings, boolean isDraft,
                          LocalDateTime publishDateTime, LocalDateTime solutionDueDateTime,
                          LocalDateTime peerReviewDueDateTime) {
                this.assignmentID = assignmentID;
                this.title = title;
                this.isTeamed = isTeamed;
                this.reviewStage = reviewStage;
                this.courseID = courseID;
                this.solutionPdfDoc = solutionPdfDoc;
                this.peerReviewPdfDoc = peerReviewPdfDoc;
                this.settings = settings;
                this.isDraft = isDraft;
                this.publishDateTime = publishDateTime;
                this.solutionDueDateTime = solutionDueDateTime;
                this.peerReviewDueDateTime = peerReviewDueDateTime;
        }


        public Assignment(){
                this.assignmentID = 1;
                this.title = "";
                this.isTeamed = false;
                this.reviewStage = false;
                this.courseID = 0;
                this.solutionPdfDoc = new byte[]{};;
                this.peerReviewPdfDoc = new byte[]{};;
                this.settings = "";
                this.isDraft = false;
                this.publishDateTime = LocalDateTime.now();
                this.solutionDueDateTime = LocalDateTime.now();
                this.peerReviewDueDateTime = LocalDateTime.now();

        }

        public int getAssignmentID() {
                return assignmentID;
        }

        public void setAssignmentID(int assignmentID) {
                this.assignmentID = assignmentID;
        }

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public boolean isTeamed() {
                return isTeamed;
        }

        public void setTeamed(boolean teamed) {
                isTeamed = teamed;
        }

        public boolean isReviewStage() {
                return reviewStage;
        }

        public void setReviewStage(boolean reviewStage) {
                this.reviewStage = reviewStage;
        }

        public int getCourseID() {
                return courseID;
        }

        public void setCourseID(int courseID) {
                this.courseID = courseID;
        }

        public byte[] getSolutionPdfDoc() {
                return solutionPdfDoc;
        }

        public void setSolutionPdfDoc(byte[] solutionPdfDoc) {
                this.solutionPdfDoc = solutionPdfDoc;
        }

        public byte[] getPeerReviewPdfDoc() {
                return peerReviewPdfDoc;
        }

        public void setPeerReviewPdfDoc(byte[] peerReviewPdfDoc) {
                this.peerReviewPdfDoc = peerReviewPdfDoc;
        }

        public String getSettings() {
                return settings;
        }

        public void setSettings(String settings) {
                this.settings = settings;
        }

        public boolean isDraft() {
                return isDraft;
        }

        public void setDraft(boolean draft) {
                isDraft = draft;
        }

        public LocalDateTime getPublishDateTime() {
                return publishDateTime;
        }

        public void setPublishDateTime(LocalDateTime publishDateTime) {
                this.publishDateTime = publishDateTime;
        }

        public LocalDateTime getSolutionDueDateTime() {
                return solutionDueDateTime;
        }

        public void setSolutionDueDateTime(LocalDateTime solutionDueDateTime) {
                this.solutionDueDateTime = solutionDueDateTime;
        }

        public LocalDateTime getPeerReviewDueDateTime() {
                return peerReviewDueDateTime;
        }

        public void setPeerReviewDueDateTime(LocalDateTime peerReviewDueDateTime) {
                this.peerReviewDueDateTime = peerReviewDueDateTime;
        }


}

