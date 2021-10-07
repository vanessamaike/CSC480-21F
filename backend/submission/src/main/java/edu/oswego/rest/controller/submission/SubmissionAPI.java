package edu.oswego.rest.controller.submission;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.oswego.rest.objects.Assignment;
import edu.oswego.rest.objects.Submission;
import edu.oswego.rest.service.IAssignmentService;
import edu.oswego.rest.service.ISubmissionService;
import edu.oswego.rest.service.impl.AssignmentService;
import edu.oswego.rest.service.impl.SubmissionService;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import java.util.List;

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
    public String getSpecificAssignment(@PathParam("submissionId") String _submissionId){
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
    public String postSubmission(String payload) throws JsonProcessingException {
        Submission submission = jsonb.fromJson(payload, Submission.class);
        submission = submissionService.save(submission);
        String res = jsonb.toJson(submission);
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
