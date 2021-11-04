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


    @GET
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
    }

    @GET
    @Path("/{courseId}")
    public String getSpecificCourse(@PathParam("courseId") String _courseId){
        //TODO This method needs to ensure authentication
        JSONObject jsonc = new JSONObject();
        List<Answer> answers = answerService.findAll();
        List<Assignment> assignments = assignmentService.findAll();
        List<Course> courses = courseService.findAll();
        List<Student> students = studentService.findAll();
        List<Question> questions = questionService.findAll();
        List<Review> reviews = reviewService.findAll();
        List<Submission> submissions = submissionService.findAll();
        List<User> users = userService.findAll();
        JSONArray answersJSON = new JSONArray(answers);
        JSONArray assignmentsJSON = new JSONArray(assignments);
        JSONArray coursesJSON = new JSONArray(courses);
        JSONArray studentsJSON = new JSONArray(students);
        JSONArray questionsJSON = new JSONArray(questions);
        JSONArray reviewsJSON = new JSONArray(reviews);
        JSONArray submissionsJSON = new JSONArray(submissions);
        JSONArray usersJSON = new JSONArray(users);

        jsonc.put("answers",answersJSON);
        jsonc.put("assignments",assignmentsJSON);
        jsonc.put("courses",coursesJSON);
        jsonc.put("students",studentsJSON);
        jsonc.put("questions",questionsJSON);
        jsonc.put("reviews",reviewsJSON);
        jsonc.put("submissions",submissionsJSON);
        jsonc.put("users",usersJSON);
        String message;
        message = jsonc.toString();

        return message;
    }

}
