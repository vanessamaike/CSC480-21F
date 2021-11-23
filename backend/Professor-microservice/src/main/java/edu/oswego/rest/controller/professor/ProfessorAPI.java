package edu.oswego.rest.controller.professor;

import edu.oswego.util.objects.*;
import edu.oswego.util.service.*;
import edu.oswego.util.service.impl.*;
import edu.oswego.util.utility.ResponseMessage;
import edu.oswego.util.utility.ReviewAssigner;
import edu.oswego.util.utility.SD;
import edu.oswego.util.utility.SendingMail;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Path("/professor")
public class ProfessorAPI{

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
    private authObject auth ;

    private List<String> ROLE = Arrays.asList("professor");

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
        auth = new authObject();
    }


    @POST
    @Path("/{userId}/course/team") // For Professor
    public Response getStudentsAndTeams(@PathParam("userId") int userId, String data ){

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
                if(teamId != -1)
                {
                    JSONObject teamJSON = new JSONObject();
                    Team team = teamService.findOne(teamId);
                    teamJSON.put("teamID",team.getTeamID());
                    teamJSON.put("teamName",team.getTeamName());
                    List<Student> studentsInTeam = studentService.findStudentsByTeamID(teamId);
                    JSONArray listOfStudentsInTeamJSON = new JSONArray(studentsInTeam);
                    teamJSON.put("students",listOfStudentsInTeamJSON);

                    listOfTeamsJSON.put(teamJSON);
                }

            }
            courseJSON.put("teams", listOfTeamsJSON);
            listOfCoursesJSON.put(courseJSON);
        }
        return new ResponseMessage().sendMessage(listOfCoursesJSON.toString(),200);
    }

    @POST
    @Path("/{userId}/course/assignment") // For Professor
    public Response getAssignmentsByProfessor(@PathParam("userId") int userId, String data ){

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

        //TODO This method needs to ensure authentication
        List<Course> courses = courseService.findCoursesByUserId(userId);
        JSONArray listOfCoursesJSON = new JSONArray();
        for(Course course : courses)
        {
            JSONObject courseJSON = new JSONObject(course);
            List<Assignment> assignments  = assignmentService.findAssignmentsByCourseId(course.getCourseID());
            JSONArray listOfAssignmentsJSON = new JSONArray(assignments);
            courseJSON.put("assignments",listOfAssignmentsJSON);
            listOfCoursesJSON.put(courseJSON);
        }

        return new ResponseMessage().sendMessage(listOfCoursesJSON.toString(),200);

    }

    @POST
    @Path("/assignment/{assignmentId}/peerreview/qualityCheck") // For Professor
    public Response getQualityCheckReviewsByProfessor(@PathParam("assignmentId") int assignmentId, String data){

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

        //TODO This method needs to ensure authentication

        Assignment assignment = assignmentService.findOne(assignmentId);
        JSONObject json = new JSONObject(assignment);

        List<Integer> distinctTeamIDs = studentService.findDistinctTeamIDsByCourseID(assignment.getCourseID());

        JSONArray listOfTeamsJSON = new JSONArray();
        List<Integer> listOfScores = new ArrayList<>();
        for(Integer teamId : distinctTeamIDs)
        {
            if(teamId != -1)
            {
                JSONObject teamJSON = new JSONObject();
                Team team = teamService.findOne(teamId);
                teamJSON.put("teamID",team.getTeamID());
                teamJSON.put("teamName",team.getTeamName());

                List<Submission_Team> submission_teams = submissionTeamService.findByTeamIdAndAssignmentId(teamId,assignmentId);
                JSONArray listOfReviewsJSON = new JSONArray();
                if(submission_teams != null)
                {
                    for(Submission_Team st : submission_teams){
                        Review review = reviewService.findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(st.getSubmissionId(),st.getAssignmentId(),st.getTeamId());

                        if(review != null)
                        {
                            listOfScores.add(review.getScore());
                            JSONObject reviewJSON = new JSONObject(review);
                            Submission submission_ = submissionService.findOne(review.getSubmissionID());
                            Team team_ = teamService.findOne(submission_.getTeamID());
                            reviewJSON.put("solutionTeamName",team_.getTeamName());
                            listOfReviewsJSON.put(reviewJSON);
                        }
                    }
                }
                teamJSON.put("peerReview",listOfReviewsJSON);
                listOfTeamsJSON.put(teamJSON);
            }

        }
        json.put("teams", listOfTeamsJSON);
        SD sd = new SD(listOfScores,1.5);

        JSONArray listOfOutlierTeamsJSON = new JSONArray();
        for(Integer teamId : distinctTeamIDs)
        {
            if(teamId != -1)
            {
                JSONObject teamJSON = new JSONObject();
                Team team = teamService.findOne(teamId);
                teamJSON.put("teamID",team.getTeamID());
                teamJSON.put("teamName",team.getTeamName());

                Submission submissionInTeam = submissionService.findTheLatestSubmissionByAssignmentIdAndTeamId(assignmentId,teamId);
                double average = -1 ;

                JSONArray reviewsJSON = new JSONArray();
                if(submissionInTeam != null)
                {
                    List<Submission_Team> submission_teams = submissionTeamService.findBySubmissionIdAndAssignmentId(submissionInTeam.getSubmissionID(),assignment.getAssignmentID());


                    if(submission_teams != null)
                    {

                        List<Integer> scores = new ArrayList<>();
                        for(Submission_Team st : submission_teams){

                            JSONObject review_teamJSON = new JSONObject();
                            Team teamReview = teamService.findOne(st.getTeamId());
                            review_teamJSON.put("teamID",teamReview.getTeamID());
                            review_teamJSON.put("teamName",teamReview.getTeamName());
                            //review_teamJSON.put("teamID",st.getTeamId());

                            Review review = reviewService.findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(st.getSubmissionId(),st.getAssignmentId(),st.getTeamId());
                            if(review != null)
                            {
                                review_teamJSON.put("score",review.getScore());
                                scores.add(review.getScore());
                                review_teamJSON.put("score",review.getScore());

                                review_teamJSON.put("isOutlier",sd.isOutlier(review.getScore()));

                            }
                            reviewsJSON.put(review_teamJSON);
                        }
                        // Get the average score
                        int sum = 0;
                        for(int s : scores)
                        {
                            sum = sum + s;
                        }
                        if(scores.size() != 0 )
                        {
                            average = (double) sum / scores.size();
                        }
                        //reviewsJSON.put(reviewList);

                    }
                }


                teamJSON.put("peerReview",reviewsJSON);
                teamJSON.put("averageScore",average);
                listOfOutlierTeamsJSON.put(teamJSON);

            }
        }
        json.put("outlier", listOfOutlierTeamsJSON);


        return new ResponseMessage().sendMessage(json.toString(),200);
    }

    @POST
    @Path("/assignment/{assignmentId}/solution/qualityCheck") // For Professor
    public Response getQualityCheckSolutionsByProfessor(@PathParam("assignmentId") int assignmentId, String data){

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


        //TODO This method needs to ensure authentication

        Assignment assignment = assignmentService.findOne(assignmentId);
        JSONObject json = new JSONObject(assignment);

        List<Integer> distinctTeamIDs = studentService.findDistinctTeamIDsByCourseID(assignment.getCourseID());

        JSONArray listOfTeamsJSON = new JSONArray();

        for(Integer teamId : distinctTeamIDs)
        {
            if(teamId != -1)
            {
                JSONObject teamJSON = new JSONObject();
                Team team = teamService.findOne(teamId);
                teamJSON.put("teamID",team.getTeamID());
                teamJSON.put("teamName",team.getTeamName());

                Submission submissionInTeam = submissionService.findTheLatestSubmissionByAssignmentIdAndTeamId(assignmentId,teamId);
                if(submissionInTeam != null)
                {
                    JSONObject submissionJSON = new JSONObject(submissionInTeam);
                    teamJSON.put("submission",submissionJSON);
                }
                listOfTeamsJSON.put(teamJSON);
            }
        }
        json.put("teams", listOfTeamsJSON);
        return new ResponseMessage().sendMessage(json.toString(),200);
    }

    @POST
    @Path("/assignment/{assignmentId}/team/{teamId}/reject/solution")
    public Response rejectSolution(@PathParam("assignmentId") int assignmentId,@PathParam("teamId") int teamId, String data){

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

        Assignment assignment = assignmentService.findOne(assignmentId);
        Course course = courseService.findOne(assignment.getCourseID());
        Submission latestSubmission = submissionService.findTheLatestSubmissionByAssignmentIdAndTeamId(assignmentId,teamId);
        List<Submission> submissions = submissionService.findSubmissionsByAssignmentIdAndTeamId(assignmentId,teamId);
        if(submissions != null)
        {
            for(Submission submission : submissions)
            {
                submission.setDeleted(true);
            }
        }
        SendingMail  sendingMail = new SendingMail();

        List<Student> students = studentService.findStudentsByTeamID(teamId);

        for(Student student : students)
        {
            //TODO change tridat1vn@gmail.com to student.getEmail()
            sendingMail.rejectSolution(student.getEmail(),course.getTitle(),assignment.getTitle(),latestSubmission.getListOfQCWordViolations());
        }

        return new ResponseMessage().sendMessage("successfully",200);
    }

    @POST
    @Path("/assignment/{assignmentId}/team/{teamId}/reject/review/{solutionId}/solutionSubmissionName/{solutionSubmissionName}")
    public Response rejectReview(@PathParam("assignmentId") int assignmentId,
                                 @PathParam("teamId") int teamId, @PathParam("solutionId") int solutionId,
                                 @PathParam("solutionSubmissionName") String solutionSubmissionName,String data){

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

        Assignment assignment = assignmentService.findOne(assignmentId);
        Course course = courseService.findOne(assignment.getCourseID());
        Review latestReview = reviewService.findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(solutionId,assignmentId,teamId);
        List<Review> reviews = reviewService.findReviewsBySubmissionIdAndAssignmentIdAndTeamId(solutionId,assignmentId,teamId);
        if(reviews != null)
        {
            for(Review review : reviews)
            {
                review.setDeleted(true);
            }
        }
        SendingMail  sendingMail = new SendingMail();
        List<Student> students = studentService.findStudentsByTeamID(teamId);

        for(Student student : students) {
            //TODO change tridat1vn@gmail.com to student.getEmail()
            sendingMail.rejectReview(student.getEmail(),course.getTitle(),assignment.getTitle(),solutionSubmissionName,latestReview.getListOfQCWordViolations());
        }
        return new ResponseMessage().sendMessage("successfully",200);
    }

    @POST
    @Path("/assignment/{assignmentId}/assignReview") // For Professor
    public Response assignReviewForTeams(@PathParam("assignmentId") int assignmentId, String data) {

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

        ReviewAssigner reviewAssigner = new ReviewAssigner();
        HashMap<Integer, List<Integer>> a = reviewAssigner.assignReviews(assignmentId);
        Assignment assignment = assignmentService.findOne(assignmentId);
        assignment.setReviewStage(true);
        assignmentService.update(assignment);
        return new ResponseMessage().sendMessage("successfully",200);
    }

    @POST
    @Path("/setResultStage/{assignmentId}") // For Professor
    public Response setResultStage(@PathParam("assignmentId") int assignmentId, String data)
    {
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


        try{
            Assignment assignment =  assignmentService.findOne(assignmentId);
            assignment.setResultStage(true);
            assignment = assignmentService.update(assignment);
            String res = jsonb.toJson(assignment);
            return new ResponseMessage().sendMessage(res,200);
        } catch (NumberFormatException e){
            return new ResponseMessage().sendMessage("Assignment ID provided was not formatted properly.",200);
        }
    }



}
