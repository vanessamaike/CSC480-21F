package edu.oswego.rest.controller.course;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.oswego.util.objects.Course;
import edu.oswego.util.objects.User;
import edu.oswego.util.service.ICourseService;
import edu.oswego.util.service.IUserService;
import edu.oswego.util.service.impl.CourseService;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
// JAX-RS
import javax.ws.rs.*;
import java.sql.SQLOutput;
import java.util.List;

import edu.oswego.util.service.impl.UserService;
import org.json.JSONArray;
import org.json.JSONObject;

@Path("/course")
public class CourseAPI {


    private static final long serialVersionUID = 1L;
    private ICourseService courseService;
    private IUserService userService;
    private Jsonb jsonb = JsonbBuilder.create();

    public CourseAPI() {
        courseService = new CourseService();
        userService = new UserService();
    }


    @GET
    public String getAllCourses(){
        //TODO This method needs to ensure authentication
        try {
            List<Course> listOfCourses = courseService.findAll();
            String res =  jsonb.toJson(listOfCourses);
            if(listOfCourses != null) return res;
            else return "There are not any courses in the database";
        } catch (NumberFormatException ne){
            System.out.println("There are not any courses in the database");
        }
        return null;
    }

    @GET
    @Path("/{courseId}")
    public String getSpecificCourse(@PathParam("courseId") String _courseId){
        //TODO This method needs to ensure authentication
        try {

            int courseId = Integer.parseInt(_courseId);
            Course course = courseService.findOne(courseId);
            Object object = Course.class.cast(course);
            Course a = (Course)object;
            String res =  jsonb.toJson(a);
            if(course != null) return res;
            else return "Course ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Course ID provided was not formatted properly.");
        }
        return null;
    }
    @POST
    public String postCourse(String payload) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Course course = jsonb.fromJson(payload, Course.class);

        User user = userService.findOne(course.getUserID());

        if(user == null)
        {
            //TODO update the response
            return "There are not any userID matched with the input userID to create the course";
        }
        else{
            if(user.getRole() == "professor")
            {
                course = courseService.save(course);
                String res =  jsonb.toJson(course);
                return res;
            }
            else {
                return "Only professor can create a course";
            }

        }
    }

    @PUT
    public String updateCourse(String payload) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Course course = jsonb.fromJson(payload, Course.class);
        course = courseService.update(course);
        String res = jsonb.toJson(course);
        return res;
    }

    @DELETE
    @Path("/{courseId}")
    public String deleteSpecificCourse(@PathParam("courseId") String _courseId){
        //TODO This method needs to ensure authentication
        try {

            int courseId = Integer.parseInt(_courseId);
            Course course = courseService.findOne(courseId);
            course = courseService.delete(course);
            String res = jsonb.toJson(course);
            if(course != null) return res;
            else return "Course ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Course ID provided was not formatted properly.");
        }
        return null;
    }
}
