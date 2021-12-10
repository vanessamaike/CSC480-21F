package edu.oswego.rest.csvImport;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonProcessingException;

import com.google.gson.Gson;
import edu.oswego.util.objects.*;
import edu.oswego.util.service.ICourseService;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.ITeamService;
import edu.oswego.util.service.IUserService;
import edu.oswego.util.service.impl.CourseService;
import edu.oswego.util.service.impl.TeamService;
import edu.oswego.util.service.impl.UserService;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONArray;

import javax.ws.rs.core.MediaType;

import org.json.JSONObject;

import edu.oswego.util.service.impl.StudentService;
// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

/**
 * @author John
 * This class handles the parsing for the CSV document containing student information.
 */

@Produces(MediaType.APPLICATION_JSON)
@Path("/parse")
public class csvImport {

    private final ICourseService courseService;
    private final IStudentService studentService;
    private final IUserService userService;
    private final ITeamService teamService;
    private final Jsonb jsonb = JsonbBuilder.create();
    Student student = new Student();
    private final authObject auth = new authObject() ;

    private final List<String> ROLE = List.of("professor");

    public csvImport() {
        teamService = new TeamService();
        courseService = new CourseService();
        studentService = new StudentService();
        userService = new UserService();
    }


    @POST
    public Response parse(String data) throws  JsonProcessingException { //receive json array from frontEnd. Ask John for exact input if unsure

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

        if(!auth.isAuthenticated(token, ROLE)){
            return new ResponseMessage().sendMessage("NotAuthenticated",404);
        }

        JSONObject object = new JSONObject(payload);
        JSONObject courseJSON = object.getJSONObject("course");

        int numberOfTeams = object.getInt("numberOfTeams");
        JSONArray studentsJSON = object.getJSONArray("csvContents");  //json array of csv contents

        Course course = jsonb.fromJson(courseJSON.toString(), Course.class);
        boolean isTeamed = courseJSON.getBoolean("isTeamed");
        course.setTeamed(isTeamed);
        course.setSemester(generateSemester());
        User user = userService.findOne(course.getUserID());

        if (user == null) {
            //TODO update the response
            return new ResponseMessage().sendMessage("There are not any userID matched with the input userID to create the course", 206);
        } else {
            if (!user.getRole().equals("professor")) {
                return new ResponseMessage().sendMessage("Only professor can create a course", 206);

            }
            course = courseService.save(course);


            for (int i = 0; i < studentsJSON.length(); i++) {  //for each student

                JSONObject pay = studentsJSON.getJSONObject(i);

                Student_CSV_Object studentCSVObject = jsonb.fromJson(pay.toString(),Student_CSV_Object.class);
                String sId = studentCSVObject.getStudentID();
                String fn =  studentCSVObject.getFirstName();
                String ln =  studentCSVObject.getLastName();
                String em = studentCSVObject.getEmail();

                User u = userService.findOneWithEmail(em);
                Student studentToAdd = new Student(sId, 0, fn, ln, em); //userId will be changed in backend
                // check If student existed in database
                Student existStudent = studentService.findStudentByStudentId(studentToAdd);
                if(existStudent == null||u==null)
                {
                    studentToAdd = studentService.save(studentToAdd);
                    studentService.setCourseForStudent(studentToAdd.getUserID(), course.getCourseID());
                }
                else {
                    existStudent.setUserID(u.getUserID());
                    studentService.setCourseForStudent(existStudent.getUserID(), course.getCourseID());
                }

                System.out.println("\n\n Successfully added Student to Database");
                }
            }

        List<Student> students = studentService.findStudentsByCourseID(course.getCourseID());
        if(!course.isTeamed()) // Independent
        {
            MakeTeamsAutomatically(students,students.size(),course.getCourseID());
        }
        else{ // Team
            if(numberOfTeams >= 2 ){
                MakeTeamsAutomatically(students,numberOfTeams,course.getCourseID());
            }
        }

        return new ResponseMessage().sendMessage("succesful",200);
    }


//_____________________________________________________________________________________________________________________________________________________________________//
//MakeTeamsAutomatically method - accept a String  payload of JSON containing an int titled 'NumberOfTeams' as well as an array of studentId. The
//method will asign them as teammates randomly
//_____________________________________________________________________________________________________________________________________________________________________//

    int teamCounter = -1;
    int keepTrackOfStudent = 0;
    int teamX;

    public void MakeTeamsAutomatically(List<Student> students, int NumberOfTeams, int courseID) throws JsonProcessingException { //automatically make teams for students

        Collections.shuffle(students);
        //int numberToSplit = studentsJSON.length() / teamNamesJSON.length();
        int numberToSplit = students.size() / NumberOfTeams;
        keepTrackOfStudent = 0;
        List<List<Integer>> listOfTeamId = new ArrayList<>();
        int teamName = 0 ;
        for (int j = 0; j < NumberOfTeams; j++) { //for each team name

            teamCounter++;
            int teamId = studentService.generateUniqueRandomTeamId();
            teamName = teamName + 1;
            List<Integer> teamID_Name = new ArrayList<>();
            teamID_Name.add(teamId);
            teamID_Name.add(teamName);
            listOfTeamId.add(teamID_Name);
            System.out.println("Team Id is" + teamId);

            for (int i = 0; i < numberToSplit; i++) { //split up the team members into even (or as much as possible) teams

                int userId = students.get(keepTrackOfStudent).getUserID();
                //int userId = obj.getJSONArray("students").getJSONObject(keepTrackOfStudent).getInt("userID"); //get first student for example
                boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database
                AddTeamsToDatabase(status, students, teamId, courseID, userId, i, teamName); //change those student's teams
                System.out.println("Added");
            }
        }

        teamCounter = 0;

        while (keepTrackOfStudent < students.size()) {

            //here are all the leftover students who weren't assigned a team
            //iterate through the teams and assign each student to one team
            //some teams will have one more member than another, but
            //this is expected because the json input didn't have enough teams
            int teamId = listOfTeamId.get(teamCounter).get(0);
            teamName = listOfTeamId.get(teamCounter).get(1);
            int userId = students.get(keepTrackOfStudent).getUserID();
            //int userId = obj.getJSONArray("students").getJSONObject(keepTrackOfStudent).getInt("userID"); //get first student for example
            boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database
            AddTeamsToDatabase(status, students, teamId, courseID, userId, 1, teamName);      //update database with their new team
            teamCounter++;

        }

    }
//_____________________________________________________________________________________________________________________________________________________________________//
//AddTeamsToDatabase method - This method will change the specified student's teamID and update the database
//_____________________________________________________________________________________________________________________________________________________________________/

    public void AddTeamsToDatabase(boolean status, List<Student> students, int teamId, int courseId, int userId, int i, int teamName) {


        if (status) { //if it is in the database, update the student object with the new teamId.


            studentService.setTeamForStudentByUserIdAndCourseId(userId, courseId, teamId); //add tigers to two students
            Team team = new Team(teamId,teamName);
            teamService.save(team);
            keepTrackOfStudent++;

        } else { //if it is not in the database, indicate so. likely change to request like 404

            keepTrackOfStudent++;
            i--;

        }
    }

//_____________________________________________________________________________________________________________________________________________________________________//
//checkIfStudentIsInDatabase method - This method will take a student id as input, and check the database to see if it contains said Id. If it does, return true.
//If it does not contain said Id, return false.
//_____________________________________________________________________________________________________________________________________________________________________//

    public boolean checkIfStudentIsInDatabase(int userId) {

        boolean status = true;
        // student = studentService.findOne(studentId);
        student = studentService.findOne(userId);

        if (student == null) { //if studentId is not in database, return status as false

            status = false;

        }

        return status;

    }

    private String generateSemester(){

        LocalDate localDate =  LocalDate.now();
        int year = localDate.getYear();
        int month = localDate.getMonth().getValue();
        StringBuilder s =  new StringBuilder();
        if(month >= 1 && month <= 5)
        {
            s.append("Spring ");
        }
        else if(month > 5 && month <= 8)
        {
            s.append("Summer ");
        }
        else if(month > 8 && month < 12)
        {
            s.append("Fall ");
        }
        else
        {
            s.append("Winter ");
        }
        s.append(year);
        return s.toString();
    }
}