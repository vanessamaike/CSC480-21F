package edu.oswego.rest.controller.student;


import edu.oswego.util.objects.*;
import edu.oswego.util.service.*;
import edu.oswego.util.service.impl.*;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

//util
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONArray;
import org.json.JSONObject;


public class StudentAPI {
    private static final long serialVersionUID = 1L;
    private ICourseService courseService;
    private IAnswerService answerService;
    private IAssignmentService assignmentService;
    private IStudentService studentService;
    private IQuestionService questionService;
    private IReviewService reviewService;
    private ISubmissionService submissionService;
    private IUserService userService;
    private ISubmissionTeamService submissionTeamService;
    private ITeamService teamService;
    private Jsonb jsonb = JsonbBuilder.create();

    public StudentAPI() {
        courseService = new CourseService();
        answerService = new AnswerService();
        assignmentService = new AssignmentService();
        studentService = new StudentService();
        questionService = new QuestionService();
        reviewService = new ReviewService();
        submissionService = new SubmissionService();
        userService = new UserService();
        submissionTeamService = new SubmissionTeamService();
        teamService = new TeamService();
    }



}
