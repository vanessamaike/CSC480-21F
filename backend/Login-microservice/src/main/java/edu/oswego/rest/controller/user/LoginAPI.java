package edu.oswego.rest.controller.user;

import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.User;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.IUserService;
import edu.oswego.util.service.impl.StudentService;
import edu.oswego.util.service.impl.UserService;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONObject;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;

@Path("/login")
public class LoginAPI {
    private static final long serialVersionUID = 1L;
    private IUserService userService;
    private Jsonb jsonb = JsonbBuilder.create();
    private authObject auth = new authObject();;
    private IStudentService studentService;
    private List<String> ROLE = Arrays.asList("professor","student");


    public LoginAPI() {
        userService = new UserService();
        studentService = new StudentService();
    }

    @POST
    public Response getSpecificUser(String token){
        ROLE = Arrays.asList("professor","student");


        //String token = obj.getString("token");

        if(auth.isAuthenticated(token,ROLE) == false){
            return new ResponseMessage().sendMessage("NotAuthenticated",404);
        }

        User user = auth.getUser();
        Student student = studentService.findOne(user.getUserID());
        JSONObject userJSON = new JSONObject(student);
        userJSON.put("role",user.getRole());
        userJSON.put("token",token);

        return new ResponseMessage().sendMessage( userJSON.toString() , 200);
    }
}
