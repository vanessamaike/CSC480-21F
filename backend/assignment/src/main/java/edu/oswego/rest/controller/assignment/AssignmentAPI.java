package edu.oswego.rest.controller.assignment;

import com.ibm.websphere.security.jwt.JwtConsumer;
import edu.oswego.util.objects.Assignment;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IAssignmentService;
import edu.oswego.util.service.impl.AssignmentService;
import edu.oswego.util.utility.ResponseMessage;

// JAX-RS
import javax.ws.rs.*;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.core.Response;


@Path("/assignment")
public class AssignmentAPI {
    private static final long serialVersionUID = 1L;
    private final IAssignmentService assignmentService;
    private final Jsonb jsonb = JsonbBuilder.create();
    private final authObject a = new authObject();
    private final String unauth = "Unauthorized: You mus log in to view this page.";
    private final String forbid = "Forbidden: You do not have access to this page.";
    private final String errorm = "An error occurred: ";
    private final String badnum = "The ID number provided was not formatted properly.";


    public AssignmentAPI() {
        assignmentService = new AssignmentService();
    }

    @GET
    public Response getAllAssignments(@HeaderParam("jwtToken") String jwtToken){
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));

            /*
            List<Assignment> listOfAssignments = assignmentService.findAll();
            String res = jsonb.toJson(listOfAssignments);
            if(listOfAssignments != null) return res;
             */
            if(role.equals("professor")){
                return new ResponseMessage().sendMessage(forbid, 403);
            } else if(role.equals("student"))
                return new ResponseMessage().sendMessage(forbid, 403);
            else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (NumberFormatException ne){
            return new ResponseMessage().sendMessage(badnum, 500);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @GET
    @Path("/{assignmentId}")
    public Response getSpecificAssignment(@PathParam("assignmentId") String _assignmentId, @HeaderParam("jwtToken") String jwtToken){
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")){
                int assignmentId = Integer.parseInt(_assignmentId);
                Assignment assignment = assignmentService.findOne(assignmentId);
                String res = jsonb.toJson(assignment);
                if(assignment != null) {
                    return new ResponseMessage().sendMessage(res, 200);
                }
                else
                    return new ResponseMessage().sendMessage("Assignment ID provided was not formatted properly.", 200);
            }
            else if(role.equals("student"))
                return new ResponseMessage().sendMessage(forbid, 403);
            else return new ResponseMessage().sendMessage(unauth, 401);
        } catch (NumberFormatException ne){
            return new ResponseMessage().sendMessage(badnum, 500);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @POST
    public Response postAssignment(String payload, @HeaderParam("jwtToken") String jwtToken) {
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")) {
                Assignment assignment =  jsonb.fromJson(payload, Assignment.class);
                assignment = assignmentService.save(assignment);
                return new ResponseMessage().sendMessage(jsonb.toJson(assignment), 200);
            }
            else if(role.equals("student"))
                return new ResponseMessage().sendMessage(forbid, 403);
            else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @PUT
    public Response updateAssignment(String payload, @HeaderParam("jwtToken") String jwtToken) {
        try{
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")){
                Assignment assignment =  jsonb.fromJson(payload, Assignment.class);
                assignment = assignmentService.update(assignment);
                return new ResponseMessage().sendMessage(jsonb.toJson(assignment), 200);
            }
            else if(role.equals("student"))
                return new ResponseMessage().sendMessage(unauth, 403);
            else
                return new ResponseMessage().sendMessage(forbid, 401);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @PUT
    @Path("/setReviewStage/{assignmentId}")
    public Response updateSetReviewStageOfAssignment(@PathParam("assignmentId") String _assId, @HeaderParam("jwtToken") String jwtToken) {
        try{
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")){
                Assignment assignment =  assignmentService.findOne(Integer.parseInt(_assId));
                assignment.setReviewStage(true);
                assignment = assignmentService.update(assignment);
                return new ResponseMessage().sendMessage(jsonb.toJson(assignment), 200);
            } else if(role.equals("student"))
                return new ResponseMessage().sendMessage(forbid, 403);
            else
                return new ResponseMessage().sendMessage(unauth, 401);

        } catch (NumberFormatException e){
            return new ResponseMessage().sendMessage(badnum, 500);
        } catch (Exception e){
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @DELETE
    @Path("/{assignmentId}")
    public Response deleteSpecificAssignment(@PathParam("assignmentId") String _assignmentId, @HeaderParam("jwtToken") String jwtToken){
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")){
                int assignmentId = Integer.parseInt(_assignmentId);
                Assignment assignment = assignmentService.findOne(assignmentId);
                assignment = assignmentService.delete(assignment);
                String res = jsonb.toJson(assignment);
                if(assignment != null)
                    return new ResponseMessage().sendMessage(res, 200);
                else
                    return new ResponseMessage().sendMessage("Assignment not found.", 404);
            } else if(role.equals("student"))
                return new ResponseMessage().sendMessage(forbid, 403);
            else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (NumberFormatException ne){
            System.out.println("Assignment ID provided was not formatted properly.");
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
        return null;
    }
}
