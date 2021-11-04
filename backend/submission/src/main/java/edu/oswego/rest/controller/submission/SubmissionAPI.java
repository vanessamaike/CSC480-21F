package edu.oswego.rest.controller.submission;

import com.fasterxml.jackson.core.JsonProcessingException;
import edu.oswego.rest.objects.Submission;
import edu.oswego.rest.utility.QualityCheck;
import edu.oswego.rest.service.ISubmissionService;
import edu.oswego.rest.service.impl.SubmissionService;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/submission")
public class SubmissionAPI {
    private static final long serialVersionUID = 1L;
    private ISubmissionService submissionService;
    private Jsonb jsonb = JsonbBuilder.create();


    public SubmissionAPI() {
        submissionService = new SubmissionService();
    }

    @GET
    public String getAllSubmissions(){
        //TODO This method needs to ensure authentication
        try {
            List<Submission> listOfAssignments = submissionService.findAll();
            String res = jsonb.toJson(listOfAssignments);
            if(listOfAssignments != null) return res;
            else return "Submission ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Assignment ID provided was not formatted properly.");
        }
        return null;
    }

    @GET
    @Path("/{submissionId}")
    public String getSpecificSubmission(@PathParam("submissionId") String _submissionId){
        //TODO This method needs to ensure authentication
        try {
            int submissionId = Integer.parseInt(_submissionId);
            Submission submission = submissionService.findOne(submissionId);
            String res = jsonb.toJson(submission);
            if(submission != null) return res;
            else return "Submission ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Submission ID provided was not formatted properly.");
        }
        return null;
    }
    @POST
    public String postSubmission(String payload) throws IOException {
        Submission submission = jsonb.fromJson(payload, Submission.class);
        String res = "";
        String[] students =  new String[] { "Adam", "Boo", "Chris", "Dat", "Erik" };
        ClassLoader classLoader = this.getClass().getClassLoader();
        /*======= Use this if you want to use local pdf File ===========*/
        //File pdfFile = new File(classLoader.getResource("Br00Mi99.pdf").getFile());
        //byte[] bytes = Files.readAllBytes(pdfFile.toPath());

        /*========= comment this if you want to use local pdf file =======*/
        byte[] bytes = submission.getPdfDoc();

        try {
            QualityCheck qc = new QualityCheck();

            HashMap<Integer, String> violations = qc.QC(bytes, students);
            if ( violations.size() > 0) {
                System.out.println("This PDF file is not accepted because it includes some profanity words : ");
                res = "This PDF file is not accepted because it includes some profanity words: ";
                for (Map.Entry value : violations.entrySet()){
                    System.out.println("Key: "+value.getKey() + " & Value: " + value.getValue());

                }
            }
            else{
                System.out.println("This PDF file is accepted to store to database ");
                submission = submissionService.save(submission);
                res = jsonb.toJson(submission);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }

    @PUT
    public String updateSubmission(String payload) throws JsonProcessingException {
        Submission submission = jsonb.fromJson(payload, Submission.class);
        submission = submissionService.update(submission);
        String res = jsonb.toJson(submission);
        return res;
    }

    @DELETE
    @Path("/{submissionId}")
    public String deleteSpecificSubmission(@PathParam("submissionId") String _submissionId){
        //TODO This method needs to ensure authentication
        try {

            int submissionId = Integer.parseInt(_submissionId);
            Submission submission = submissionService.findOne(submissionId);
            submission = submissionService.delete(submission);
            String res = jsonb.toJson(submission);
            if(submission != null) return res;
            else return "Submission ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Submission ID provided was not formatted properly.");
        }
        return null;
    }
}
