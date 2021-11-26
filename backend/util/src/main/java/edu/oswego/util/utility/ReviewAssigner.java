package edu.oswego.util.utility;

import edu.oswego.util.objects.Assignment;
import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.Submission;
import edu.oswego.util.objects.Submission_Team;
import edu.oswego.util.service.*;
import edu.oswego.util.service.impl.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ReviewAssigner {

    private ICourseService courseService;
    private IAnswerService answerService;
    private IAssignmentService assignmentService;
    private IStudentService studentService;
    private IQuestionService questionService;
    private IReviewService reviewService;
    private ISubmissionService submissionService;
    private IUserService userService;
    private ISubmissionTeamService submissionTeamService;


    private Jsonb jsonb = JsonbBuilder.create();

    public ReviewAssigner() {
        courseService = new CourseService();
        answerService = new AnswerService();
        assignmentService = new AssignmentService();
        studentService = new StudentService();
        questionService = new QuestionService();
        reviewService = new ReviewService();
        submissionService = new SubmissionService();
        userService = new UserService();
        submissionTeamService = new SubmissionTeamService();
    }


//    public boolean hasAccess(int useID, int corID, int subID){
//        boolean retVal = false;
//
//        List<Submission_Team> assignedTeams = submissionTeamService.findBySubmission(subID);
//        for(Submission_Team team : assignedTeams){
//            if(ctsserv.findByCourseAndUser(corID, useID).getTeamId()==team.getTeamId()) {
//                retVal = true;
//                break;
//            }
//        }
//
//        return retVal;
//    }
    public HashMap<Integer, List<Integer>>  assignReviews(int assignmentId){

        int reviewsPerAssignment  = 3;

        Assignment assignment = assignmentService.findOne(assignmentId);

        List<Integer> tIDs = studentService.findDistinctTeamIDsByCourseID(assignment.getCourseID());

        HashMap<Integer, List<Integer>> subTeams = new HashMap<>();

        List<Submission> subs = new ArrayList<>();

        for(Integer teamId : tIDs)
        {
            if(teamId != -1)
            {
                Submission submissionInTeam = submissionService.findTheLatestSubmissionByAssignmentIdAndTeamId(assignmentId,teamId);
                if(submissionInTeam != null)
                {
                    subs.add(submissionInTeam);
                }

            }
        }

        //This will keep track of how many submissions a team has been given.
        //Key is team ID, value is the number of submissions.
        HashMap<Integer, Integer> teamSubs = new HashMap<>();

        //This value tracks the maximum number of submissions a team is allowed to work on.
        //This value is increased when all teams have the same number of submissions, and a submission needs another
        //team to perform a peer review.
        int maxSubs = 1;
        //For every submission
        for(Submission s : subs){
            //Assign a number of teams to review the submission.
            for(int q = 0; q < reviewsPerAssignment; q++){
                //This is the index of the team in tIDs, representing the random team.
                int randomTeam = (int)(Math.random()*tIDs.size());
                //This is how many times we have tried to assign a team to this submission
                int tryCount = 0;
                //While the try count is less than the size of the number of teams
                while(tryCount < tIDs.size()){
                    //If the team selected already has the maximum number of submissions allowed
                    //Or if the team selected is the team that made the submission
                    teamSubs.putIfAbsent(tIDs.get(randomTeam), 0);
                    if(teamSubs.get(tIDs.get(randomTeam))>=maxSubs || tIDs.get(randomTeam)==s.getTeamID()) {
                        //Try the next team in the team list
                        randomTeam++;
                        //Or loop back to the beginning of the team list
                        if(randomTeam>=tIDs.size()) randomTeam = 0;
                    }
                    //Else, the team selected can be assigned a submission
                    else{
                        subTeams.putIfAbsent(tIDs.get(randomTeam), new ArrayList<>());
                        if(!subTeams.get(tIDs.get(randomTeam)).contains(s.getSubmissionID())){
                            //Increase the number of submissions the team has been given to review.
                            teamSubs.put(tIDs.get(randomTeam), teamSubs.get(tIDs.get(randomTeam))+1);
                            //And record this submission assignment in the database.
                            submissionTeamService.save(new Submission_Team(s.getSubmissionID(), tIDs.get(randomTeam), assignmentId));
                            //If the array list is empty, fix that first
                            subTeams.computeIfAbsent(tIDs.get(randomTeam), k -> new ArrayList<>());
                            //Add the submissionID into the subTeams HashMap
                            subTeams.get(tIDs.get(randomTeam)).add(s.getSubmissionID());
                            //Since we have now assigned a team to the submission, we do not need to stay in the while loop.
                            break;
                        }
                        else{
                            randomTeam++;
                            if(randomTeam==tIDs.size()) randomTeam = 0;
                        }
                    }
                    tryCount++;
                    //If we have tried to assign a submission to a team the same number of teams that exist
                    if(tryCount==tIDs.size()) {
                        //Then each team has reached the maximum number of submissions for this submission
                        //and the maximum needs to be increased.
                        tryCount = 0;
                        maxSubs++;
                    }
                }
                //Now we can move on to assigning the next team.
            }
        }
        //This code converts the subTeams HashMap into a 2d array, where the first value in each row
        //is the teamID, and the following values are the submissionIDs associated with that team.
//        Integer[][] asList = new Integer[subTeams.keySet().size()+1][];
//        ArrayList<Integer> keys = new ArrayList<>(subTeams.keySet());
//        for(int q = 0; q < keys.size(); q++){
//            int teamId = keys.get(q);
//            for(int w = 0; w < subTeams.get(teamId).size()+1; w++) {
//                //Instantiate the row.
//                if(w==0) {
//                    asList[q] = new Integer[subTeams.get(teamId).size()+1];
//                    asList[q][w] = teamId;
//                }
//                asList[q][w] = subTeams.get(teamId).get(w);
//            }
//        }
        //return asList;
        return subTeams;
        }
}
