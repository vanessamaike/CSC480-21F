package edu.oswego.rest.controller.submission;

import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.Submission;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.impl.StudentService;
import edu.oswego.util.utility.QualityCheck;
import edu.oswego.util.service.ISubmissionService;
import edu.oswego.util.service.impl.SubmissionService;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONObject;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;

@Path("/solution")
public class SubmissionAPI {
    private static final long serialVersionUID = 1L;
    private final ISubmissionService submissionService;
    private final IStudentService studentService;
    private final Jsonb jsonb = JsonbBuilder.create();
    private final authObject auth = new authObject();

    private final List<String> ROLE = Arrays.asList("professor","student");

    public SubmissionAPI() {
        submissionService = new SubmissionService();
        studentService = new StudentService();
    }

    @POST
    public Response postSubmission(String data) {

        JSONObject obj = new JSONObject(data);
        JSONObject payloadJSON ;
        try{
            payloadJSON = obj.getJSONObject("data");
        }
        catch (Exception e)
        {
            payloadJSON = null;
        }
        String payload = "";
        if(payloadJSON != null)
        {
            payload = payloadJSON.toString();
        }

        String token = obj.getString("token");

        if(!auth.isAuthenticated(token, ROLE)){
            return new ResponseMessage().sendMessage("NotAuthenticated",404);
        }

        Submission submission = jsonb.fromJson(payload, Submission.class);

        //This section calculates the student name list
        List<Student> allStudents = studentService.findAll();
        String[] students = new String[allStudents.size()*2];
        int i = 0;
        for(Student student : allStudents){
            students[i] = student.getFirstName();
            students[i + 1 ] = student.getLastName();
            i = i + 2;
        }

        try {
            QualityCheck qc = new QualityCheck();
            String violations = qc.QC(submission.getPdfDoc(), students);
            submission.setListOfQCWordViolations(violations);

            submission = submissionService.save(submission);
            return new ResponseMessage().sendMessage(jsonb.toJson(submission), 200);

        } catch (Exception e) {
            return new ResponseMessage().sendMessage(e.toString(), 500);

        }
    }
/*
    @GET
    public Response getAllSubmissions(){
        //This method needs to ensure authentication
        try {
            List<Submission> listOfAssignments = submissionService.findAll();
            String res = jsonb.toJson(listOfAssignments);
            if(listOfAssignments != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("Assignment ID provided was not formatted properly.",200);
        } catch (NumberFormatException ne){
            System.out.println("Assignment ID provided was not formatted properly.");
        }
        return null;
    }

    @GET
    @Path("/{submissionId}")
    public Response getSpecificSubmission(@PathParam("submissionId") String _submissionId){
        //This method needs to ensure authentication
        try {
            int submissionId = Integer.parseInt(_submissionId);
            Submission submission = submissionService.findOne(submissionId);
            String res = jsonb.toJson(submission);
            if(submission != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage(res,200);
        } catch (NumberFormatException ne){
            System.out.println("Submission ID provided was not formatted properly.");
        }
        return null;
    }


    @PUT
    @Path("/setSeen/{submissionId}")
    public Response updateSetSeenSubmission(@PathParam("submissionId") String _submissionId) throws JsonProcessingException {
        try {

            Submission submission = submissionService.findOne(Integer.parseInt(_submissionId));
            submission.setSeen(true);
            submissionService.update(submission);
            String res = jsonb.toJson(submission);
            return new ResponseMessage().sendMessage(res,200);
        } catch (NumberFormatException e){
            return new ResponseMessage().sendMessage("Submission ID provided was not formatted properly.",200);
        }
    }

    @DELETE
    @Path("/{submissionId}")
    public Response deleteSpecificSubmission(@PathParam("submissionId") String _submissionId){
        //This method needs to ensure authentication
        try {

            int submissionId = Integer.parseInt(_submissionId);
            Submission submission = submissionService.findOne(submissionId);
            submission = submissionService.delete(submission);
            String res = jsonb.toJson(submission);
            if(submission != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("Submission ID provided was not formatted properly.",200);
        } catch (NumberFormatException ne){
            System.out.println("Submission ID provided was not formatted properly.");
        }
        return null;
    }

 */
}
