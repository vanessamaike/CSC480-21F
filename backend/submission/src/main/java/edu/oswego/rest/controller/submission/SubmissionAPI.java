package edu.oswego.rest.controller.submission;

import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.Submission;


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
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/solution")
public class SubmissionAPI {
    private static final long serialVersionUID = 1L;
    private ISubmissionService submissionService;
    private IStudentService studentService;
    private Jsonb jsonb = JsonbBuilder.create();


    public SubmissionAPI() {
        submissionService = new SubmissionService();
        studentService = new StudentService();
    }

    @GET
    public Response getAllSubmissions(){
        //TODO This method needs to ensure authentication
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
        //TODO This method needs to ensure authentication
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
    @POST
    public Response postSubmission(String payload) throws IOException {
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
        //TODO This method needs to ensure authentication
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
}
