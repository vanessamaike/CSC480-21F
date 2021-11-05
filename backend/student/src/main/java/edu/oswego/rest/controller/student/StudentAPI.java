package edu.oswego.rest.controller.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.oswego.util.objects.Course;
import edu.oswego.util.objects.User;
import edu.oswego.util.service.ICourseService;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.impl.CourseService;
import edu.oswego.util.service.impl.StudentService;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;


// JAX-RS
import javax.ws.rs.*;
import java.util.List;

//util
import edu.oswego.util.objects.Student;
import org.json.JSONArray;
import org.json.JSONObject;

@Path("/student")
public class StudentAPI {
    private static final long serialVersionUID = 1L;
    private IStudentService studentService;
    private ICourseService courseService;

    private Jsonb jsonb = JsonbBuilder.create();


    public StudentAPI() {
        studentService = new StudentService();
        courseService = new CourseService();
    }

    @GET
    public String getAllStudents(){
        //TODO This method needs to ensure authentication
        try {
            List<Student> listOfStudents = studentService.findAll();
            String res = jsonb.toJson(listOfStudents);
            if(listOfStudents != null) return res;
            else return "There are not any students on the database";
        } catch (NumberFormatException ne){
            System.out.println("There are not any students on the database");
        }
        return null;
    }

    @GET
    @Path("/{userID}")
    public String getSpecificStudent(@PathParam("userID") int userID){
        //TODO This method needs to ensure authentication
        try {
            Student student = studentService.findOne(userID);
            String res = jsonb.toJson(student);
            if(student != null) return res;
            else return "Student ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Student ID provided was not formatted properly.");
        }
        return null;
    }
    @POST
    public String postStudent(String payload) throws JsonProcessingException {
        JSONObject obj = new JSONObject(payload);
        JSONObject studentJSON = obj.getJSONObject("student"); //get array of json of student array
        int courseID = obj.getInt("courseID");

        Student student = jsonb.fromJson(studentJSON.toString(), Student.class);
        Course course = courseService.findOne(courseID);

        if(course == null)
        {
            //TODO update the response
            return "There are not any courseID matched with the input courseID to create the student";
        }
        else{
            student = studentService.save(student);
            studentService.setCourseForStudent(student.getUserID(),courseID);
            String res = jsonb.toJson(student);
            return res;
        }
    }

    @PUT
    public String updateStudent(String payload) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Student student = jsonb.fromJson(payload, Student.class);
        student = studentService.update(student);
        String res = jsonb.toJson(student);
        return res;
    }

    @DELETE
    @Path("/{userId}")
    public String deleteSpecificStudent(@PathParam("userId") int userId){
        //TODO This method needs to ensure authentication
        try {
            Student student = studentService.findOne(userId);
            student = studentService.delete(student);
            String res = jsonb.toJson(student);
            if(student != null) return res;
            else return "Student ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Student ID provided was not formatted properly.");
        }
        return null;
    }
}
