package edu.oswego.rest.controller.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibm.websphere.security.jwt.InvalidConsumerException;
import com.ibm.websphere.security.jwt.InvalidTokenException;
import com.ibm.websphere.security.jwt.JwtConsumer;
import edu.oswego.util.objects.Course;
import edu.oswego.util.objects.User;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.ICourseService;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.impl.CourseService;
import edu.oswego.util.service.impl.StudentService;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;


// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

//util
import edu.oswego.util.objects.Student;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONArray;
import org.json.JSONObject;

@Path("/student")
public class StudentAPI {
    private static final long serialVersionUID = 1L;
    private final IStudentService studentService;
    private final ICourseService courseService;
    private final authObject a = new authObject();
    private final String unauth = "Unauthorized: You mus log in to view this page.";
    private final String forbid = "Forbidden: You do not have access to this page.";
    private final String errorm = "An error occurred: ";
    private final String badnum = "The ID number provided was not formatted properly.";


    private final Jsonb jsonb = JsonbBuilder.create();


    public StudentAPI() {
        studentService = new StudentService();
        courseService = new CourseService();
    }

    @GET
    public Response getAllStudents(){
        /*
        try {
            List<Student> listOfStudents = studentService.findAll();
            String res = jsonb.toJson(listOfStudents);
            if(listOfStudents != null) return res;
            else return "There are not any students on the database";
        } catch (NumberFormatException ne){
            System.out.println("There are not any students on the database");
        }
        */
        return new ResponseMessage().sendMessage(forbid, 403);
    }

    @GET
    @Path("/{userID}")
    public Response getSpecificStudent(@PathParam("userID") int userID){
        /*
        try {
            Student student = studentService.findOne(userID);
            String res = jsonb.toJson(student);
            if(student != null) return res;
            else return "Student ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Student ID provided was not formatted properly.");
        }
         */
        return new ResponseMessage().sendMessage(forbid, 403);
    }

    @POST
    public Response postStudent(String payload, @HeaderParam("jwtToken") String jwtToken) {
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));

            if(role.equals("professor")){
                JSONObject obj = new JSONObject(payload);
                JSONObject studentJSON = obj.getJSONObject("student"); //get array of json of student array
                int courseID = obj.getInt("courseID");

                Student student = jsonb.fromJson(studentJSON.toString(), Student.class);
                Course course = courseService.findOne(courseID);

                if(course == null)
                    return new ResponseMessage().sendMessage("This course does not exist.", 404);
                else{
                    student = studentService.save(student);
                    studentService.setCourseForStudent(student.getUserID(),courseID);
                    return new ResponseMessage().sendMessage(jsonb.toJson(student), 200);
                }
            } else if(role.equals("student"))
                return new ResponseMessage().sendMessage(forbid, 403);
            else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @PUT
    public Response updateStudent(String payload) {
        /*
        Student student = jsonb.fromJson(payload, Student.class);
        student = studentService.update(student);
        String res = jsonb.toJson(student);
        return res;
         */
        return new ResponseMessage().sendMessage(forbid, 403);
    }

    @DELETE
    @Path("/{userId}")
    public Response deleteSpecificStudent(@PathParam("userId") int userId, @HeaderParam("jwtToken") String jwtToken){
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));

            if(role.equals("professor")){
                Student student = studentService.findOne(userId);
                student = studentService.delete(student);
                String res = jsonb.toJson(student);
                if(student != null)
                    return new ResponseMessage().sendMessage(res, 200);
                else
                    return new ResponseMessage().sendMessage("User was not found.", 404);
            } else if(role.equals("student")){
                return new ResponseMessage().sendMessage(forbid, 403);
            } else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (NumberFormatException ne){
            return new ResponseMessage().sendMessage(badnum, 500);
        }  catch (Exception e) {
            e.printStackTrace();
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }
}
