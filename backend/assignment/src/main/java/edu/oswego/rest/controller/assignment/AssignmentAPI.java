package edu.oswego.rest.controller.assignment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import edu.oswego.rest.objects.Assignment;
import edu.oswego.rest.service.IAssignmentService;
import edu.oswego.rest.service.impl.AssignmentService;

// JAX-RS
import javax.ws.rs.*;
import java.util.List;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;



@Path("/assignment")
public class AssignmentAPI {
    private static final long serialVersionUID = 1L;
    private IAssignmentService assignmentService;
    private Jsonb jsonb = JsonbBuilder.create();

    public AssignmentAPI() {
        assignmentService = new AssignmentService();
    }

    @GET
    public String getAllAssignments(){
        //TODO This method needs to ensure authentication
        try {
            List<Assignment> listOfAssignments = assignmentService.findAll();
            String res = jsonb.toJson(listOfAssignments);
            if(listOfAssignments != null) return res;
            else return "There are not any assignments in the database.";
        } catch (NumberFormatException ne){
            System.out.println("There are not any assignments in the database");
        }
        return null;
    }

    @GET
    @Path("/{assignmentId}")
    public String getSpecificAssignment(@PathParam("assignmentId") String _assignmentId){
        //TODO This method needs to ensure authentication
        try {

            int assignmentId = Integer.parseInt(_assignmentId);
            Assignment assignment = assignmentService.findOne(assignmentId);
            String res = jsonb.toJson(assignment);
            if(assignment != null) return res;
            else return "Assignment ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Assignment ID provided was not formatted properly.");
        }
        return null;
    }
    @POST
    public String postAssignment(String payload) throws JsonProcessingException {
        Assignment assignment =  jsonb.fromJson(payload, Assignment.class);
        assignment = assignmentService.save(assignment);
        String res = jsonb.toJson(assignment);
        return res;
    }

    @PUT
    public String updateAssignment(String payload) throws JsonProcessingException {
        Assignment assignment =  jsonb.fromJson(payload, Assignment.class);
        assignment = assignmentService.update(assignment);
        String res = jsonb.toJson(assignment);
        return res;
    }

    @DELETE
    @Path("/{assignmentId}")
    public String deleteSpecificAssignment(@PathParam("assignmentId") String _assignmentId){
        //TODO This method needs to ensure authentication
        try {

            int assignmentId = Integer.parseInt(_assignmentId);
            Assignment assignment = assignmentService.findOne(assignmentId);
            assignment = assignmentService.delete(assignment);
            String res = jsonb.toJson(assignment);
            if(assignment != null) return res;
            else return "Assignment ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Assignment ID provided was not formatted properly.");
        }
        return null;
    }
}
