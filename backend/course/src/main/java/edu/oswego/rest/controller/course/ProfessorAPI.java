package edu.oswego.rest.controller.course;

import edu.oswego.util.objects.*;
import edu.oswego.util.service.*;
import edu.oswego.util.service.impl.*;
import edu.oswego.util.utility.ResponseMessage;
import edu.oswego.util.utility.ReviewAssigner;
import edu.oswego.util.utility.SD;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.*;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Path("/professor1")
public class ProfessorAPI {

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

    public ProfessorAPI() {
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
