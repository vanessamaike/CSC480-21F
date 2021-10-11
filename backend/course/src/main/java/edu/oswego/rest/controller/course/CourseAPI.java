package edu.oswego.rest.controller.course;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.oswego.rest.objects.Course;
import edu.oswego.rest.service.ICourseService;
import edu.oswego.rest.service.impl.CourseService;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
// JAX-RS
import javax.ws.rs.*;
import java.sql.SQLOutput;
import java.util.List;

@Path("/course")
public class CourseAPI {


    private static final long serialVersionUID = 1L;
    private ICourseService courseService;
    private Jsonb jsonb = JsonbBuilder.create();

    public CourseAPI() {
        courseService = new CourseService();
    }

    @GET
    @Path("/generateUniqueRandomId")
    public int  getGenerateUniqueRandomId(){
        return courseService.generateUniqueRandomId();
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
            String res =  jsonb.toJson(course);
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
        course = courseService.save(course);
        String res =  jsonb.toJson(course);
        return res;
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
