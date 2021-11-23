package edu.oswego.rest.controller.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import edu.oswego.util.objects.User;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IUserService;
import edu.oswego.util.service.impl.UserService;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import java.util.List;

@Path("/user")
public class UserAPI {
    private static final long serialVersionUID = 1L;
    private IUserService userService;
    private Jsonb jsonb = JsonbBuilder.create();
    public UserAPI() {
        userService = new UserService();
    }

    @GET
    @Path("/{userId}")
    public String getSpecificUser(@PathParam("userId") String _userId){
        //TODO This method needs to ensure authentication
        try {

            int userId = Integer.parseInt(_userId);
            User user = userService.findOne(userId);
            String res = jsonb.toJson(user);
            if(user != null) return res;
            else return "User ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("User ID provided was not formatted properly.");
        }
        return null;
    }
    @POST
    public String postUser(String payload) throws JsonProcessingException {
        User user = jsonb.fromJson(payload, User.class);
        user = userService.save(user);
        String res = jsonb.toJson(user);
        return res;
    }

    @PUT
    public String updateUser(String payload) throws JsonProcessingException {
        User user = jsonb.fromJson(payload, User.class);
        user = userService.update(user);
        String res = jsonb.toJson(user);
        return res;
    }

    @DELETE
    @Path("/{userId}")
    public String deleteSpecificUser(@PathParam("userId") String _userId){
        //TODO This method needs to ensure authentication
        try {

            int userId = Integer.parseInt(_userId);
            User user = userService.findOne(userId);
            user = userService.delete(user);
            String res = jsonb.toJson(user);
            if(user != null) return res;
            else return "User ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("User ID provided was not formatted properly.");
        }
        return null;
    }
}
