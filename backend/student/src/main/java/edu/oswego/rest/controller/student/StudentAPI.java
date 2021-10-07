package edu.oswego.rest.controller.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.oswego.rest.objects.Assignment;
import edu.oswego.rest.objects.Student;
import edu.oswego.rest.service.IAssignmentService;
import edu.oswego.rest.service.IStudentService;
import edu.oswego.rest.service.impl.AssignmentService;
import edu.oswego.rest.service.impl.StudentService;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import java.util.List;

@Path("/student")
public class StudentAPI {
    private static final long serialVersionUID = 1L;
    private IStudentService studentService;
    private Jsonb jsonb = JsonbBuilder.create();


    public StudentAPI() {
        studentService = new StudentService();
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
    @Path("/{studentId}")
    public String getSpecificStudent(@PathParam("studentId") String _studentId){
        //TODO This method needs to ensure authentication
        try {

            String studentID = _studentId;
            Student student = studentService.findOne(studentID);
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
        ObjectMapper mapper = new ObjectMapper();
        Student student = jsonb.fromJson(payload, Student.class);
        student = studentService.save(student);
        String res = jsonb.toJson(student);
        return res;
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
    @Path("/{studentId}")
    public String deleteSpecificStudent(@PathParam("studentId") String _studentId){
        //TODO This method needs to ensure authentication
        try {
            Student student = studentService.findOne(_studentId);
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
