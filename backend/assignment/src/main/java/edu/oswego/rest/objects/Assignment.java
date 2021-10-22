package edu.oswego.rest.objects;

import java.util.Date;

public class Assignment {

        private int assignmentID;
        private int courseID;
        private byte[] pdfDoc;
        private String settings;


        public Assignment(int assignmentID, byte[] pdfDoc, String settings,int courseID){
                this.courseID = courseID;
                this.pdfDoc = pdfDoc;
                this.settings = settings;
                this.assignmentID = assignmentID;
        }

        public Assignment(){
                this.assignmentID = 1;
                this.courseID = 0;
                this.pdfDoc = new byte[]{};
                this.settings = "";
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

        public char getSetting(int index){
                if(index < settings.length()) return settings.charAt(index);
                else return 0;
        }


        public boolean updateSetting(int index, char setting){
                String firstHalf = "";
                if(index-1>0) firstHalf = settings.substring(0, index-1);
                String lastHalf = "";
                if(index+1<settings.length()) lastHalf = settings.substring(index+1);
                settings = firstHalf+setting+lastHalf;
                return true;
        }


        public boolean updateAllSettings(String settings){
                this.settings = settings;
                return true;
        }

}

