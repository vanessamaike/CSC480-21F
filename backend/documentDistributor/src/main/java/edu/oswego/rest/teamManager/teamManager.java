package edu.oswego.rest.teamManager;

import com.ibm.websphere.security.jwt.JwtConsumer;
import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.impl.StudentService;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/makeTeam")
public class teamManager {

    /* @Author John Owens
    Team Manager Class. Allow professor to make teams for students.
    */
    Student student = new Student();
    StudentService studentService = new StudentService();

    private final authObject a = new authObject();
    private final String unauth = "Unauthorized: You mus log in to view this page.";
    private final String forbid = "Forbidden: You do not have access to this page.";
    private final String errorm = "An error occurred: ";


//_____________________________________________________________________________________________________________________________________________________________________//
//MakeTeamsManually method - accept a String  payload of JSON containing an int titled 'teamID' as well as an array of studentId. The professor may add x amount of
//students per team as they wish and this method will asign the teamID, to all of them.
//_____________________________________________________________________________________________________________________________________________________________________//

    @POST
    @Path("/manual")
    public Response MakeTeamsManually(String payload, @HeaderParam("jwtToken") String jwtToken) {

        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));

            if(role.equals("professor")){
                JSONObject obj = new JSONObject(payload);
                JSONArray studentsJSON = obj.getJSONArray("students"); //get array of json of student array
                int courseID = obj.getInt("courseID");
                int teamID = studentService.generateUniqueRandomTeamId();

                for (int i = 0; i < studentsJSON.length(); i++) { //for each studentId in the array...
                    int userId = obj.getJSONArray("students").getJSONObject(i).getInt("userID");
                    //int userId = obj.getJSONArray("students").getInt(i);
                    boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database
                    AddTeamsToDatabase(status, studentsJSON, teamID, courseID, userId); //update each student's team
                }
                return new ResponseMessage().sendMessage("success", 200);
            } else if(role.equals("student"))
                return new ResponseMessage().sendMessage(forbid, 403);
            else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

//_____________________________________________________________________________________________________________________________________________________________________//
//MakeTeamsAutomatically method - accept a String  payload of JSON containing an int titled 'NumberOfTeams' as well as an array of studentId. The 
//method will asign them as teammates randomly
//_____________________________________________________________________________________________________________________________________________________________________//

    int teamCounter = -1;
    int keepTrackOfStudent = 0;
    int teamX;

    @POST
    @Path("/auto")
    public Response MakeTeamsAutomatically(String payload, @HeaderParam("jwtToken") String jwtToken) { //automatically make teams for students

        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));

            if(role.equals("professor")){
                JSONObject obj = new JSONObject(payload);
                JSONArray studentsJSON = obj.getJSONArray("students"); //array of students
                int NumberOfTeams = obj.getInt("numberOfTeams");
                int courseID = obj.getInt("courseID");
                int numberToSplit = studentsJSON.length() /  NumberOfTeams;
                keepTrackOfStudent = 0;

                for (int j = 0; j <  NumberOfTeams; j++) { //for each team name
                    teamCounter++;
                    teamX = studentService.generateUniqueRandomTeamId();
                    System.out.println("Team X is" + teamX);

                    for (int i = 0; i < numberToSplit; i++) { //split up the team members into even (or as much as possible) teams
                        int userId =  obj.getJSONArray("students").getJSONObject(keepTrackOfStudent).getInt("userID"); //get first student for example
                        boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database

                        AddTeamsToDatabase(status, studentsJSON, teamX, courseID, userId); //change those student's teams
                        System.out.println("Added");
                    }
                }

                teamCounter = 0;
                while (keepTrackOfStudent < studentsJSON.length()) { //here are all the leftover students who weren't assigned a team
                    //iterate through the teams and assign each student to one team
                    //some teams will have one more member than another, but
                    //this is expected because the json input didn't have enough teams
                    int userId =  obj.getJSONArray("students").getJSONObject(keepTrackOfStudent).getInt("userID"); //get first student for example
                    boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database
                    AddTeamsToDatabase(status, studentsJSON, teamX, courseID, userId);      //update database with their new team
                    System.out.println("Added extra");

                    teamCounter++;
                }
                return new ResponseMessage().sendMessage("success", 200);
            } else if(role.equals("student"))
                return new ResponseMessage().sendMessage(forbid, 403);
            else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }

    }
//_____________________________________________________________________________________________________________________________________________________________________//
//AddTeamsToDatabase method - This method will change the specified student's teamID and update the database
//_____________________________________________________________________________________________________________________________________________________________________/


    private void AddTeamsToDatabase(boolean status, JSONArray studentsJSON, int teamId, int courseId, int userId) {
        if (status){ //if it is in the database, update the student object with the new teamId.
        studentService.setTeamForStudentByUserIdAndCourseId(userId,courseId,teamId); //add tigers to two students
        } else { //if it is not in the database, indicate so. likely change to request like 404
            System.out.println("The entered Id : '" + studentsJSON.get(keepTrackOfStudent) + "' does not exist in the list of students in the class.");
        }
        keepTrackOfStudent++;
    }

//_____________________________________________________________________________________________________________________________________________________________________//
//checkIfStudentIsInDatabase method - This method will take a student id as input, and check the database to see if it contains said Id. If it does, return true.
//If it does not contain said Id, return false.
//_____________________________________________________________________________________________________________________________________________________________________//

    private boolean checkIfStudentIsInDatabase(int userId) {

        boolean status = true;
        // student = studentService.findOne(studentId);
        student = studentService.findOne(userId);

        if (student == null) { //if studentId is not in database, return status as false
            status = false;
        }
        return status;
    }
}