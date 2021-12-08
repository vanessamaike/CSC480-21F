package edu.oswego.util.utility;

import java.util.Properties;
//import javax.inject.Inject;
//import org.eclipse.microprofile.config.inject.ConfigProperty;
import javax.mail.*;
import javax.mail.internet.*;

public class SendingMail {

    private final ConfigReader read = new ConfigReader();

//    @Inject
//    @ConfigProperty(name = "edu.oswego.rest.util.utility.SendingMail.from")
    String from = read.getValueAsString("edu.oswego.rest.util.utility.SendingMail.from");


//    @Inject
//    @ConfigProperty(name = "edu.oswego.rest.util.utility.SendingMail.password")
    String password = read.getValueAsString("edu.oswego.rest.util.utility.SendingMail.password");

//    @Inject
//    @ConfigProperty(name = "edu.oswego.rest.util.utility.SendingMail.host")
    String host = read.getValueAsString("edu.oswego.rest.util.utility.SendingMail.host");

    void sendMail(String receiverEmail, String subjectHeader, String contentMessage){
        Properties properties = System.getProperties();

        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        // Get the Session object.
        // and pass username and password
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication(from, password);

            }

        });

        // Used to debug SMTP issues
        session.setDebug(true);

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(receiverEmail));

            // Set Subject: header field
            message.setSubject(subjectHeader);

            // Now set the actual message
            message.setText(contentMessage);

            System.out.println("sending...");
            // Send message
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }

    }

    public void rejectSolution(String receiverEmail, String courseTitle, String assignmentTitle, String violations){
        //Subject: "<course title>, <assignment title>: Submission Rejected";

        //Content: "Your professor has rejected your submission for the assignment <assignment name> for the course <course title>.
        // The following errors were detected by the system: <QC and SD errors>.
        // The professor may have further reason for rejecting your submission, and if you have questions,
        // please contact your professor. Otherwise, resubmit your document by the deadline

        String content = "Your professor has rejected your solution submission for the assignment " + assignmentTitle +
                " for the course " + courseTitle + " . The following errors were detected by the system: " + violations + " . " +
                "The professor may have further reason for rejecting your solution submission, and if you have questions, please contact your professor. Otherwise, resubmit your solution by the deadline";

        sendMail(receiverEmail, courseTitle + ", " + assignmentTitle + " : Solution Submission Rejected", content);
    }


    public void rejectReview(String receiverEmail, String courseTitle, String assignmentTitle,
                             String solutionSubmissionName, String violations){
        //Subject: "<course title>, <assignment title>: Submission Rejected";

        //Content: "Your professor has rejected your submission for the assignment <assignment name> for the course <course title>.
        // The following errors were detected by the system: <QC and SD errors>.
        // The professor may have further reason for rejecting your submission, and if you have questions,
        // please contact your professor. Otherwise, resubmit your document by the deadline

        String content = "Your professor has rejected your peer review submission for the " + solutionSubmissionName + " in the assignment " + assignmentTitle +
                " for the course " + courseTitle + " . The following errors were detected by the system: " + violations + " . " +
                "The professor may have further reason for rejecting your solution submission, and if you have questions, please contact your professor. Otherwise, resubmit your peer review by the deadline";

        sendMail(receiverEmail, courseTitle + ", " + assignmentTitle + " : PeerReview Submission Rejected", content);
    }

    public void assignmentAvailable(String receiverEmail, String courseTitle, String assignmentTitle){
        String content = "Your professor has made a new assignment available for your course, "+courseTitle+". Log " +
                "in to view the assignment, "+assignmentTitle+", and complete it by the due date.";
        sendMail(receiverEmail, courseTitle+", "+assignmentTitle+" : Now available", content);
    }

    public void reviewStageAvailable(String receiverEmail, String courseTitle, String assignmentTitle){
        String content = "Your professor has started the review stage your assignment, "+assignmentTitle+". Log " +
                "in to complete the peer reviews in the course, "+courseTitle+", and complete them by the due date.";
        sendMail(receiverEmail, courseTitle+", "+assignmentTitle+" : Now reviewing", content);
    }
}
