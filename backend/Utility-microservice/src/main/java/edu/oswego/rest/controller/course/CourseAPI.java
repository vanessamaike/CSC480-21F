package edu.oswego.rest.controller.course;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.oswego.util.objects.Course;
import edu.oswego.util.objects.User;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.ICourseService;
import edu.oswego.util.service.IUserService;
import edu.oswego.util.service.impl.CourseService;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.List;

import edu.oswego.util.service.impl.UserService;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONArray;
import org.json.JSONObject;

@Path("/course")
public class CourseAPI {


    private static final long serialVersionUID = 1L;
    private ICourseService courseService;
    private IUserService userService;
    private Jsonb jsonb = JsonbBuilder.create();
    private authObject auth = new authObject();

    private List<String> ROLE = Arrays.asList("professor");
    public CourseAPI() {
        courseService = new CourseService();
        userService = new UserService();
    }


    @GET
    public Response getAllCourses(){
        //TODO This method needs to ensure authentication
        try {
            List<Course> listOfCourses = courseService.findAll();
            String res =  jsonb.toJson(listOfCourses);
            if(listOfCourses != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("There are not any courses in the database",200);
        } catch (NumberFormatException ne){
            System.out.println("There are not any courses in the database");
        }
        return null;
    }

    @GET
    @Path("/{courseId}")
    public Response getSpecificCourse(@PathParam("courseId") String _courseId){
        //TODO This method needs to ensure authentication
        try {

            int courseId = Integer.parseInt(_courseId);
            Course course = courseService.findOne(courseId);
            Object object = Course.class.cast(course);
            Course a = (Course)object;
            String res =  jsonb.toJson(a);
            if(course != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("Course ID provided was not formatted properly.",200);
        } catch (NumberFormatException ne){
            System.out.println("Course ID provided was not formatted properly.");
        }
        return null;
    }
    @POST
    public Response postCourse(String payload) throws JsonProcessingException {

        Course course = jsonb.fromJson(payload, Course.class);

        User user = userService.findOne(course.getUserID());

        if(user == null)
        {
            //TODO update the response
            return new ResponseMessage().sendMessage( "There are not any userID matched with the input userID to create the course",200);
        }
        else{
            if(user.getRole().equals("professor") )
            {
                course = courseService.save(course);
                String res =  jsonb.toJson(course);
                return new ResponseMessage().sendMessage(res,200);
            }
            else {
                return new ResponseMessage().sendMessage("Only professor can create a course",200);
            }

        }
    }


    @POST
    @Path("/delete/{courseId}")
    public Response deleteSpecificCourse(@PathParam("courseId") String _courseId, String data ){
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

            int courseId = Integer.parseInt(_courseId);
            Course course = courseService.findOne(courseId);
            course = courseService.delete(course);
            String res = jsonb.toJson(course);
            if(course != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("Course ID provided was not formatted properly.",200);
        } catch (NumberFormatException ne){
            System.out.println("Course ID provided was not formatted properly.");
        }
        return null;
    }
}
