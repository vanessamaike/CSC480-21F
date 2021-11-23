package edu.oswego.rest.controller.assignment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import edu.oswego.util.objects.Assignment;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IAssignmentService;
import edu.oswego.util.service.impl.AssignmentService;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONObject;

// JAX-RS
import javax.ws.rs.*;
import java.util.Arrays;
import java.util.List;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.core.Response;


@Path("/assignment")
public class AssignmentAPI {
    private static final long serialVersionUID = 1L;
    private IAssignmentService assignmentService;
    private Jsonb jsonb = JsonbBuilder.create();
    private authObject auth = new authObject() ;

    private List<String> ROLE = Arrays.asList("professor");

    public AssignmentAPI() {
        assignmentService = new AssignmentService();
    }

    @GET
    public Response getAllAssignments(){
        //TODO This method needs to ensure authentication
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

        if(auth.isAuthenticated(token,ROLE) == false){
            return new ResponseMessage().sendMessage("NotAuthenticated",404);
        }

        //TODO This method needs to ensure authentication
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
    public Response postAssignment(String data) throws JsonProcessingException {

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

        if(auth.isAuthenticated(token,ROLE) == false){
            return new ResponseMessage().sendMessage("NotAuthenticated",404);
        }

        Assignment assignment =  jsonb.fromJson(payload, Assignment.class);
        assignment = assignmentService.save(assignment);
        String res = jsonb.toJson(assignment);
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

        if(auth.isAuthenticated(token,ROLE) == false){
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
}
