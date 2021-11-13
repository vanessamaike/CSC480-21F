package edu.oswego.rest.controller.submission;

import com.ibm.websphere.security.jwt.JwtConsumer;
import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.Submission;


import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.impl.StudentService;
import edu.oswego.util.utility.QualityCheck;

import edu.oswego.util.service.ISubmissionService;
import edu.oswego.util.service.impl.SubmissionService;
import edu.oswego.util.utility.ResponseMessage;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/submission")
public class SubmissionAPI {
    private static final long serialVersionUID = 1L;
    private final ISubmissionService submissionService;
    private final IStudentService studentService;
    private final Jsonb jsonb = JsonbBuilder.create();
    private final authObject a = new authObject();
    private final String unauth = "Unauthorized: You mus log in to view this page.";
    private final String forbid = "Forbidden: You do not have access to this page.";
    private final String errorm = "An error occurred: ";
    private final String badnum = "The ID number provided was not formatted properly.";


    public SubmissionAPI() {
        submissionService = new SubmissionService();
        studentService = new StudentService();
    }

    @GET
    public Response getAllSubmissions(@HeaderParam("jwtToken") String jwtToken){
        try {
            String role = a.authUser(new JwtConsumer().createJwt(jwtToken));
            if(role.equals("professor")){
                List<Submission> listOfAssignments = submissionService.findAll();
                String res = jsonb.toJson(listOfAssignments);
                if(listOfAssignments != null) {
                    return new ResponseMessage().sendMessage(res, 200);
                }
                else return new ResponseMessage().sendMessage("No submissions found.", 404);
            }
            else if(role.equals("student")){
                return new ResponseMessage().sendMessage(forbid, 403);
            }
            else{
                return new ResponseMessage().sendMessage(unauth, 401);
            }
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @GET
    @Path("/{submissionId}")
    public Response getSpecificSubmission(@PathParam("submissionId") String _submissionId, @HeaderParam("jwtToken") String jwtToken){
        try {
            String role = a.authUser(new JwtConsumer().createJwt(jwtToken));
            if(role.equals("professor")||role.equals("student")){
                List<Submission> listOfAssignments = submissionService.findAll();
                String res = jsonb.toJson(listOfAssignments);
                if(listOfAssignments != null) {
                    return new ResponseMessage().sendMessage(res, 200);
                }
                else return new ResponseMessage().sendMessage("No such submission found.", 200);
            }
            else{
                return new ResponseMessage().sendMessage(unauth, 401);
            }
        } catch (NumberFormatException e){
            return new ResponseMessage().sendMessage(badnum, 500);

        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);

        }
    }

    @POST
    public Response postSubmission(String payload, @HeaderParam("jwtToken") String jwtToken) {
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
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            QualityCheck qc = new QualityCheck();
            String violations = qc.QC(submission.getPdfDoc(), students);
            submission.setListOfQCWordViolations(violations);

            if(role.equals("student") || role.equals("professor")){
                submission = submissionService.save(submission);
                return new ResponseMessage().sendMessage(jsonb.toJson(submission), 200);
            }
            else{
                return new ResponseMessage().sendMessage(unauth, 401);
            }

        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);

        }
    }

    @PUT
    @Path("/setSeen/{submissionId}")
    public Response updateSetSeenSubmission(@PathParam("submissionId") String _submissionId, @HeaderParam("jwtToken") String jwtToken) {
        try {
            String role = a.authUser(new JwtConsumer().createJwt(jwtToken));
            if(role.equals("professor")){
                Submission submission = submissionService.findOne(Integer.parseInt(_submissionId));
                submission.setSeen(true);
                submissionService.update(submission);
                return new ResponseMessage().sendMessage(jsonb.toJson(submission), 200);
            }
            else if(role.equals("student")) {
                return new ResponseMessage().sendMessage(forbid, 403);

            }
            else{
                return new ResponseMessage().sendMessage(unauth, 401);
            }
        } catch (NumberFormatException e){
            return new ResponseMessage().sendMessage(badnum, 500);

        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @DELETE
    @Path("/{submissionId}")
    public Response deleteSpecificSubmission(@PathParam("submissionId") String _submissionId, @HeaderParam("jwtToken") String jwtToken){
        try {
            String role = a.authUser(new JwtConsumer().createJwt(jwtToken));
            if(role.equals("professor")){
                int submissionId = Integer.parseInt(_submissionId);
                Submission submission = submissionService.findOne(submissionId);
                submission = submissionService.delete(submission);
                String res = jsonb.toJson(submission);
                if(submission != null) {
                    return new ResponseMessage().sendMessage(res, 200);
                }
                return new ResponseMessage().sendMessage("Submission not found.", 404);
            }
            else if(role.equals("student")) {
                return new ResponseMessage().sendMessage(forbid, 403);
            }
            else{
                return new ResponseMessage().sendMessage(unauth, 401);
            }
        } catch (NumberFormatException e){
            return new ResponseMessage().sendMessage(badnum, 500);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }
}
