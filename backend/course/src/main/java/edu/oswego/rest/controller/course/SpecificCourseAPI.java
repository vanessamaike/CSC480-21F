package edu.oswego.rest.controller.course;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.oswego.util.dao.IQuestionDAO;
import edu.oswego.util.dao.ISubmissionDAO;
import edu.oswego.util.objects.*;
import edu.oswego.util.service.*;
import edu.oswego.util.service.impl.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.*;
import java.util.List;


@Path("/professor")
public class SpecificCourseAPI {


    private static final long serialVersionUID = 1L;
    private ICourseService courseService;
    private IAnswerService answerService;
    private IAssignmentService assignmentService;
    private IStudentService studentService;
    private IQuestionService questionService;
    private IReviewService reviewService;
    private ISubmissionService submissionService;
    private IUserService userService;


    private Jsonb jsonb = JsonbBuilder.create();

    public SpecificCourseAPI() {
        courseService = new CourseService();
        answerService = new AnswerService();
        assignmentService = new AssignmentService();
        studentService = new StudentService();
        questionService = new QuestionService();
        reviewService = new ReviewService();
        submissionService = new SubmissionService();
        userService = new UserService();
    }


/*    @GET
    public String getAllCourses(){
        //TODO This method needs to ensure authentication
        Course c = courseService.findAll().get(0);
        String message;
        JSONObject json = new JSONObject();

        JSONObject jsonc = new JSONObject(c);

        JSONArray array = new JSONArray();
        JSONObject teams = new JSONObject();
        teams.put("information", "test");
        teams.put("id", 3);
        teams.put("name", "course1");
        array.put(teams);
        jsonc.put("teams",array);


        message = jsonc.toString();
        return message;
    }*/

    @GET
    @Path("/{userId}/course/team")
    public String getSpecificCourse(@PathParam("userId") int userId){
        //TODO This method needs to ensure authentication

        List<Course> courses = courseService.findCoursesByUserId(userId);
        JSONArray listOfCoursesJSON = new JSONArray();
        for(Course course : courses)
        {
            JSONObject courseJSON = new JSONObject(course);

            List<Student> students = studentService.findStudentsByCourseID(course.getCourseID());
            JSONArray listOfStudentsJSON = new JSONArray(students);
            courseJSON.put("students",listOfStudentsJSON);

            List<Integer> distinctTeamIDs = studentService.findDistinctTeamIDsByCourseID(course.getCourseID());
            JSONArray listOfTeamsJSON = new JSONArray();

            for(Integer teamId : distinctTeamIDs)
            {
                JSONObject teamJSON = new JSONObject();
                teamJSON.put("teamID",teamId);

                List<Student> studentsInTeam = studentService.findStudentsByTeamID(teamId);
                JSONArray listOfStudentsInTeamJSON = new JSONArray(studentsInTeam);
                teamJSON.put("students",listOfStudentsInTeamJSON);

                listOfTeamsJSON.put(teamJSON);
            }
            courseJSON.put("teams", listOfTeamsJSON);
            listOfCoursesJSON.put(courseJSON);
        }
        return listOfCoursesJSON.toString();

    }

}
