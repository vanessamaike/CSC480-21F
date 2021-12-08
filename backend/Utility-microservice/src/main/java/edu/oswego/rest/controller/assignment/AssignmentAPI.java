package edu.oswego.rest.controller.assignment;

import edu.oswego.util.objects.Assignment;
import edu.oswego.util.utility.SendingMail;
import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IAssignmentService;
import edu.oswego.util.service.ICourseService;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.impl.AssignmentService;
import edu.oswego.util.service.impl.CourseService;
import edu.oswego.util.service.impl.StudentService;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONObject;

// JAX-RS
import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.List;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.core.Response;


@Path("/assignment")
public class AssignmentAPI {
    private static final long serialVersionUID = 1L;
    private final IAssignmentService assignmentService;
    private final ICourseService courseService;
    private final IStudentService studentService;
    private final Jsonb jsonb = JsonbBuilder.create();
    private final authObject auth = new authObject() ;

    private final List<String> ROLE = List.of("professor");

    public AssignmentAPI() {
        assignmentService = new AssignmentService();
        courseService = new CourseService();
        studentService = new StudentService();
    }

    @POST
    @Path("/{assignmentId}")
    public Response getSpecificAssignment(@PathParam("assignmentId") String _assignmentId, String data){
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

        try {
            int assignmentId = Integer.parseInt(_assignmentId);
            Assignment assignment = assignmentService.findOne(assignmentId);
            String res = jsonb.toJson(assignment);
            if(assignment != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("There are not any assignments in the database.",200);
        } catch (NumberFormatException ne){
            System.out.println("Assignment ID provided was not formatted properly.");
        }
        return null;
    }

    @POST
    @Path("/update")
    public Response updateAssignment(String data) {

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

        Assignment assignment =  jsonb.fromJson(payload, Assignment.class);
        assignment = assignmentService.update(assignment);
        String res = jsonb.toJson(assignment);
        return new ResponseMessage().sendMessage(res,200);
    }
    
    @POST
    public Response postAssignment(String data) {

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

        Assignment assignment =  jsonb.fromJson(payload, Assignment.class);
        assignment = assignmentService.save(assignment);
        String res = jsonb.toJson(assignment);
        int courseID = assignment.getCourseID();
        ArrayList<Student> studs = (ArrayList<Student>) studentService.findStudentsByCourseID(courseID);
        SendingMail mailer = new SendingMail();
        for(Student stud : studs){
            mailer.assignmentAvailable(stud.getEmail(), courseService.findOne(courseID).getTitle(), assignment.getTitle());
        }
        return new ResponseMessage().sendMessage(res,200);
    }


    @POST
    @Path("/delete/{assignmentId}")
    public Response deleteSpecificAssignment(@PathParam("assignmentId") String _assignmentId,String data){

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
        try {

            int assignmentId = Integer.parseInt(_assignmentId);
            Assignment assignment = assignmentService.findOne(assignmentId);
            assignment = assignmentService.delete(assignment);
            String res = jsonb.toJson(assignment);
            if(assignment != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("Assignment ID provided was not formatted properly.",200);
        } catch (NumberFormatException ne){
            System.out.println("Assignment ID provided was not formatted properly.");
        }
        return null;
    }

    /*
    @GET
    public Response getAllAssignments(){
        try {
            List<Assignment> listOfAssignments = assignmentService.findAll();
            String res = jsonb.toJson(listOfAssignments);
            if(listOfAssignments != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("There are not any assignments in the database.",200);
        } catch (NumberFormatException ne){
            System.out.println("There are not any assignments in the database");
        }
        return null;
    }

     */
}
