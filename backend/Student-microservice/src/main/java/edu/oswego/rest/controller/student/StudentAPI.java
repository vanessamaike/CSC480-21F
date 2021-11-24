package edu.oswego.rest.controller.student;

import edu.oswego.util.objects.*;
import edu.oswego.util.service.*;
import edu.oswego.util.service.impl.*;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Path("/student")
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
    private authObject auth = new authObject();;

    private List<String> ROLE = Arrays.asList("student");
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

    @POST
    @Path("/{userID}")
    public Response getSpecificStudent(@PathParam("userID") int userID, String data ){
        ROLE = Arrays.asList("student");

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
        try {
            Student student = studentService.findOne(userID);
            String res = jsonb.toJson(student);
            if(student != null) return new ResponseMessage().sendMessage(res,200);
            else return  new ResponseMessage().sendMessage("Student ID provided was not formatted properly.",200);
        } catch (NumberFormatException ne){
            System.out.println("Student ID provided was not formatted properly.");
        }
        return null;
    }

    @POST
    public Response postStudent(String data ) {
        ROLE = Arrays.asList("professor");
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


        JSONObject object = new JSONObject(payload);
        JSONObject studentJSON = object.getJSONObject("student"); //get array of json of student array
        int courseID = object.getInt("courseID");
        String res = "";
        Student studentToAdd = jsonb.fromJson(studentJSON.toString(), Student.class);
        Course course = courseService.findOne(courseID);

        if(course == null)
        {
            //TODO update the response
            res =  "There are not any courseID matched with the input courseID to create the student";
        }
        else{
            Student existStudent = studentService.findStudentByStudentId(studentToAdd);
            if(existStudent == null)
            {
                studentToAdd = studentService.save(studentToAdd);
                studentService.setCourseForStudent(studentToAdd.getUserID(), course.getCourseID());
            }
            else {
                studentToAdd = existStudent;
                studentService.setCourseForStudent(existStudent.getUserID(), course.getCourseID());
            }

            res = jsonb.toJson(studentToAdd);
        }

        // To check if that student is added into DB
        Student student = studentService.findOne(studentToAdd.getUserID());
        if (student != null)
        {
            if(course.isTeamed() == false) // Independent
            {
                int teamId = studentService.generateUniqueRandomTeamId();
                studentService.setTeamForStudentByUserIdAndCourseId(student.getUserID(), courseID, teamId);

            }
            else{

                List<Integer> distinctTeamIDs = studentService.findDistinctTeamIDsByCourseID(course.getCourseID());
                Collections.shuffle(distinctTeamIDs);
                studentService.setTeamForStudentByUserIdAndCourseId(student.getUserID(), courseID, distinctTeamIDs.get(0));
            }
        }

        return new ResponseMessage().sendMessage(res,200);
    }

    @POST
    @Path("/delete/{userId}")
    public Response deleteSpecificStudent(@PathParam("userId") int userId, String data ){
        ROLE = Arrays.asList("professor");
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

        try {
            Student student = studentService.findOne(userId);
            student = studentService.delete(student);
            String res = jsonb.toJson(student);
            if(student != null) return new ResponseMessage().sendMessage(res,200);
            else return new ResponseMessage().sendMessage("Student ID provided was not formatted properly.",200);
        } catch (NumberFormatException ne){
            System.out.println("Student ID provided was not formatted properly.");
        }
        return null;
    }

    @POST
    @Path("/{userId}/assignment/{assignmentId}/reviews") // For Student
    public Response getAssignReviewForTeams(@PathParam("userId") int userId, @PathParam("assignmentId") int assignmentId, String data ) {

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

        int teamId = studentService.findDistinctTeamIDByCourseIDAndUserId(assignment.getCourseID(), userId);

        List<Submission_Team> submission_teams = submissionTeamService.findByTeamIdAndAssignmentId(teamId,assignmentId);

        JSONObject json = new JSONObject(assignment);

        JSONArray listOfSubmissionsJSON = new JSONArray();
        if(submission_teams != null)
        {
            for(Submission_Team submission_team : submission_teams)
            {
                JSONObject teamJSON = new JSONObject();
                Team team = teamService.findOne(submission_team.getTeamId());
                teamJSON.put("teamID",team.getTeamID());
                teamJSON.put("teamName",team.getTeamName());


                Submission submissionInTeam = submissionService.findOne(submission_team.getSubmissionId());
                if(submissionInTeam != null)
                {
                    JSONObject submissionJSON = new JSONObject(submissionInTeam);
                    teamJSON.put("submission",submissionJSON);
                }
                listOfSubmissionsJSON.put(teamJSON);
            }
        }
        json.put("teams",listOfSubmissionsJSON );


        return new ResponseMessage().sendMessage(json.toString(),200);
    }

    @POST
    @Path("/{userId}/course/assignment/result/student") // For student
    public Response getResultAssignmentsByStudent(@PathParam("userId") int userId, String data ){

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
        List<Course> courses = courseService.findCoursesByStudent_UserID(userId);
        JSONArray listOfCoursesJSON = new JSONArray();
        for(Course course : courses)
        {
            JSONObject courseJSON = new JSONObject(course);
            List<Assignment> assignments  = assignmentService.findAssignmentsByCourseId(course.getCourseID());
            Integer teamId = studentService.findDistinctTeamIDByCourseIDAndUserId(course.getCourseID(),userId);
            JSONArray listOfAssignmentsJSON = new JSONArray();
            for(Assignment assignment : assignments){
                Submission submissionInTeam = submissionService.findTheLatestSubmissionByAssignmentIdAndTeamId(assignment.getAssignmentID(),teamId);
                double average = -1;
                if(submissionInTeam != null)
                {
                    List<Submission_Team> submission_teams = submissionTeamService.findBySubmissionIdAndAssignmentId(submissionInTeam.getSubmissionID(),assignment.getAssignmentID());
                    if(submission_teams != null) {
                        List<Integer> scores = new ArrayList<>();
                        for(Submission_Team st : submission_teams){
                            Review review = reviewService.findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(st.getSubmissionId(),st.getAssignmentId(),st.getTeamId());
                            if(review != null)
                            {
                                scores.add(review.getScore());
                            }
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

                    }
                }
                JSONObject assignmentJSON = new JSONObject(assignment);
                assignmentJSON.put("averageScore",average);
                listOfAssignmentsJSON.put(assignmentJSON);
            }

            courseJSON.put("assignments",listOfAssignmentsJSON);

            listOfCoursesJSON.put(courseJSON);
        }
        return new ResponseMessage().sendMessage(listOfCoursesJSON.toString(),200);
    }

    @POST
    @Path("/{userId}/assignment/{assignmentId}/result/student") // For student
    public Response getResultByAssignmentIdAndStudentID(@PathParam("userId") int userId,@PathParam("assignmentId") int assignmentId, String data ) {

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
        Integer teamId = studentService.findDistinctTeamIDByCourseIDAndUserId(assignment.getCourseID(),userId);
        Submission submissionInTeam = submissionService.findTheLatestSubmissionByAssignmentIdAndTeamId(assignmentId,teamId);
        JSONObject assignmentJSON = new JSONObject(assignment);
        double average = -1 ;
        JSONArray reviewsJSON = new JSONArray();
        if(submissionInTeam != null)
        {
            List<Submission_Team> submission_teams = submissionTeamService.findBySubmissionIdAndAssignmentId(submissionInTeam.getSubmissionID(),assignment.getAssignmentID());

            if(submission_teams != null)
            {
                List<Review> reviewList = new ArrayList<>();
                List<Integer> scores = new ArrayList<>();
                for(Submission_Team st : submission_teams){
                    Review review = reviewService.findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(st.getSubmissionId(),st.getAssignmentId(),st.getTeamId());
                    if(review != null)
                    {
                        reviewList.add(review);
                        scores.add(review.getScore());
                    }
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

                reviewsJSON = new JSONArray(reviewList);

            }
        }
        assignmentJSON.put("peerReview",reviewsJSON);
        assignmentJSON.put("averageScore",average);

        return new ResponseMessage().sendMessage(assignmentJSON.toString(),200);
    }

    @POST
    @Path("/{userId}/course/assignment/student") // For student
    public Response getAssignmentsByStudent(@PathParam("userId") int userId, String data ){

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
        List<Course> courses = courseService.findCoursesByStudent_UserID(userId);
        JSONArray listOfCoursesJSON = new JSONArray();
        for(Course course : courses)
        {
            JSONObject courseJSON = new JSONObject(course);
            JSONArray listOfAssignmentsJSON = new JSONArray();
            List<Assignment> assignments  = assignmentService.findAssignmentsByCourseId(course.getCourseID());
            for (Assignment assignment : assignments)
            {
                JSONObject assignmentJSON = new JSONObject(assignment);

                // To check if they complete the solution or not
                Integer teamId = studentService.findDistinctTeamIDByCourseIDAndUserId(assignment.getCourseID(),userId);
                Submission submissionInTeam = submissionService.findTheLatestSubmissionByAssignmentIdAndTeamId(assignment.getAssignmentID(),teamId);
                if(submissionInTeam != null)
                {
                    assignmentJSON.put("isSolutionCompleted", true);
                }
                else{
                    assignmentJSON.put("isSolutionCompleted", false);
                }

                // To check if they complete review or not
                List<Submission_Team> submission_teams = submissionTeamService.findByTeamIdAndAssignmentId(teamId,assignment.getAssignmentID());
                List<Review> listOfReviews = new ArrayList<>();

                if(submission_teams != null)
                {
                    for(Submission_Team st : submission_teams){
                        Review review = reviewService.findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(st.getSubmissionId(),st.getAssignmentId(),st.getTeamId());

                        if(review != null)
                        {
                            listOfReviews.add(review);
                        }
                    }

                    if(submission_teams.size() == listOfReviews.size())
                    {
                        assignmentJSON.put("isPeerReviewCompleted", true);
                    }
                    else{
                        assignmentJSON.put("isPeerReviewCompleted", false);
                    }


                }
                listOfAssignmentsJSON.put(assignmentJSON);

            }

            courseJSON.put("assignments",listOfAssignmentsJSON);
            listOfCoursesJSON.put(courseJSON);
        }
        return new ResponseMessage().sendMessage(listOfCoursesJSON.toString(),200);
    }

    @POST
    @Path("/{userId}/course/team/student") // For Student
    public Response getStudentsAndTeamsByStudent(@PathParam("userId") int userId, String data ){

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

        List<Course> courses = courseService.findCoursesByStudent_UserID(userId);
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
    @Path("/{userId}/course/{courseId}/teamId") //For  Student
    public Response getTeamIDByUserID(@PathParam("userId") int userId,@PathParam("courseId") int courseId, String data ){

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

        Integer teamId = studentService.findDistinctTeamIDByCourseIDAndUserId(courseId,userId);
        JSONObject json = new JSONObject();
        Team team = teamService.findOne(teamId);
        json.put("teamID",team.getTeamID());
        json.put("teamName",team.getTeamName());
        return new ResponseMessage().sendMessage(json.toString(),200);
    }


}
