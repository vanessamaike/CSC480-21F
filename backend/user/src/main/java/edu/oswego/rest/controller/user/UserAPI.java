package edu.oswego.rest.controller.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.ibm.websphere.security.jwt.InvalidConsumerException;
import com.ibm.websphere.security.jwt.InvalidTokenException;
import com.ibm.websphere.security.jwt.JwtConsumer;
import edu.oswego.util.objects.User;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IUserService;
import edu.oswego.util.service.impl.UserService;
import edu.oswego.util.utility.ResponseMessage;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/user")
public class UserAPI {
    private static final long serialVersionUID = 1L;
    private IUserService userService;
    private Jsonb jsonb = JsonbBuilder.create();private final authObject a = new authObject();
    private final String unauth = "Unauthorized: You mus log in to view this page.";
    private final String forbid = "Forbidden: You do not have access to this page.";
    private final String errorm = "An error occurred: ";
    private final String badnum = "The ID number provided was not formatted properly.";



    public UserAPI() {
        userService = new UserService();
    }

    @GET
    public Response getAllUsers(){
        /*
        try {
            List<User> listOfUsers = userService.findAll();
            String res = jsonb.toJson(listOfUsers);
            if(listOfUsers != null) return res;
            else return "There are not any users in the database.";
        } catch (NumberFormatException ne){
            System.out.println("There are not any users in the database.");
        }
         */
        return new ResponseMessage().sendMessage(forbid, 403);
    }

    @GET
    @Path("/{userId}")
    public Response getSpecificUser(@PathParam("userId") String _userId){
        /*
        try {
            int userId = Integer.parseInt(_userId);
            User user = userService.findOne(userId);
            String res = jsonb.toJson(user);
            if(user != null) return res;
            else return "User ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("User ID provided was not formatted properly.");
        }
        */
        return new ResponseMessage().sendMessage(forbid, 403);
    }
    @POST
    public Response postUser(String payload) {
        /*
        User user = jsonb.fromJson(payload, User.class);
        user = userService.save(user);
        String res = jsonb.toJson(user);
        return res;
         */
        return new ResponseMessage().sendMessage(forbid, 403);
    }

    @PUT
    public Response updateUser(String payload) {
        /*
        User user = jsonb.fromJson(payload, User.class);
        user = userService.update(user);
        String res = jsonb.toJson(user);
         */
        return new ResponseMessage().sendMessage(forbid, 403);
    }

    /**
     * This method only allows professors to delete student user objects.
     * @param _userId The user ID of the student to be deleted.
     * @param jwtToken The JSON Web Token used for authorization.
     * @return HTTP code 200 with deleted user if successful, else an HTTP 400 or 500 code.
     */
    @DELETE
    @Path("/{userId}")
    public Response deleteSpecificUser(@PathParam("userId") String _userId, @HeaderParam("jwtToken") String jwtToken){
        try {
            int userId = Integer.parseInt(_userId);
            User user = userService.findOne(userId);

            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));

            if(role.equals("professor")){
                if(user.getRole().equals("student")){
                    user = userService.delete(user);
                    String res = jsonb.toJson(user);
                    if(user != null)
                        return new ResponseMessage().sendMessage(res, 200);
                    else return new ResponseMessage().sendMessage("User not found.", 404);
                } else return new ResponseMessage().sendMessage(forbid, 403);
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
}
