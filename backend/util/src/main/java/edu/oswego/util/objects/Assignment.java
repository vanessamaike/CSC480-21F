package edu.oswego.util.objects;

import javax.json.bind.annotation.JsonbDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

public class Assignment {

        private int assignmentID;
        private int courseID;
        private byte[] pdfDoc;
        private String settings;
        private String title;
        private boolean isTeamed;
        private boolean reviewStage;
        @JsonbDateFormat(value = "MM-dd-yyyy'T'HH:mm:ss")
        private LocalDateTime dueDateTime;
        @JsonbDateFormat(value = "MM-dd-yyyy'T'HH:mm:ss")
        private LocalDateTime reviewDateTime;


        public Assignment(int assignmentID, byte[] pdfDoc, String settings,
                          int courseID, String title, boolean isTeamed,
                          boolean reviewStage, LocalDateTime dueDateTime,
                          LocalDateTime reviewDateTime){
                this.courseID = courseID;
                this.pdfDoc = pdfDoc;
                this.settings = settings;
                this.assignmentID = assignmentID;
                this.title = title;
                this.isTeamed = isTeamed;
                this.reviewStage = reviewStage;

                this.dueDateTime = dueDateTime;
                this.reviewDateTime = reviewDateTime;
        }

        public Assignment(){
                this.assignmentID = 1;
                this.courseID = 0;
                this.pdfDoc = new byte[]{};
                this.settings = "";
                this.title = "";
                this.isTeamed = false;
                this.reviewStage = false;
                this.dueDateTime = LocalDateTime.now();
                this.reviewDateTime = LocalDateTime.now();
        }

        public int getAssignmentID() {
                return assignmentID;
        }

        public int getCourseID() {
                return courseID;
        }

        public byte[] getPdfDoc() {
                return pdfDoc;
        }

        public void setAssignmentID(int assignmentID) {
                this.assignmentID = assignmentID;
        }

        public void setCourseID(int courseID) {
                this.courseID = courseID;
        }

        public void setPdfDoc(byte[] pdfDoc) {
                this.pdfDoc = pdfDoc;
        }

        public void setSettings(String settings) {
                this.settings = settings;
        }


        public String getSettings(){
                return settings;
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

        public LocalDateTime getDueDateTime() {
                return dueDateTime;
        }

        public void setDueDateTime(LocalDateTime dueDateTime) {
                this.dueDateTime = dueDateTime;
        }

        public LocalDateTime getReviewDateTime() {
                return reviewDateTime;
        }

        public void setReviewDateTime(LocalDateTime reviewDateTime) {
                this.reviewDateTime = reviewDateTime;
        }



}

