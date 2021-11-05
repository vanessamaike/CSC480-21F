package edu.oswego.rest.teamManager;

import java.util.List;
import java.util.Objects;
import java.util.Random;

import javax.ws.rs.POST;
import javax.ws.rs.Path;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.oswego.util.objects.Student;
import edu.oswego.util.service.impl.StudentService;

@Path("/makeTeam")

public class teamManager {

    /* @Author John Owens
    Team Manager Class. Allow professor to make teams for students.
    */
     Student student = new Student();
     StudentService studentService = new StudentService();

//_____________________________________________________________________________________________________________________________________________________________________//
//MakeTeamsManually method - accept a String  payload of JSON containing an int titled 'teamID' as well as an array of studentId. The professor may add x amount of
//students per team as they wish and this method will asign the teamID, to all of them.
//_____________________________________________________________________________________________________________________________________________________________________//

   @POST
   @Path("/manual")
     public String MakeTeamsManually(String payload) throws JsonProcessingException {

        JSONObject obj = new JSONObject(payload);
        JSONArray studentsJSON = obj.getJSONArray("students"); //get array of json of student array
        int courseID = obj.getInt("courseID");
        int teamID = studentService.generateUniqueRandomTeamId();

        for (int i = 0; i < studentsJSON.length(); i++) { //for each studentId in the array...
             int userId = obj.getJSONArray("students").getJSONObject(i).getInt("userID");
            //int userId = obj.getJSONArray("students").getInt(i);
             boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database
             AddTeamsToDatabase(status, studentsJSON, teamID, courseID, userId, i); //update each student's team
             
        }
        return "success";
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
     public void MakeTeamsAutomatically(String payload) throws JsonProcessingException { //automatically make teams for students

      JSONObject obj = new JSONObject(payload);
      JSONArray studentsJSON = obj.getJSONArray("students"); //array of students
      int NumberOfTeams = obj.getInt("numberOfTeams");
        int courseID = obj.getInt("courseID");

      //JSONArray teamNamesJSON = obj.getJSONArray("teams"); //array of team names
      //int numberToSplit = studentsJSON.length() / teamNamesJSON.length();
      int numberToSplit = studentsJSON.length() /  NumberOfTeams;
      keepTrackOfStudent = 0;

      for (int j = 0; j <  NumberOfTeams; j++) { //for each team name

         teamCounter++;
         teamX = studentService.generateUniqueRandomTeamId();
         System.out.println("Team X is" + teamX);

      for (int i = 0; i < numberToSplit; i++) { //split up the team members into even (or as much as possible) teams


             int userId =  obj.getJSONArray("students").getJSONObject(keepTrackOfStudent).getInt("userID"); //get first student for example
             boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database

            AddTeamsToDatabase(status, studentsJSON, teamX, courseID, userId, i); //change those student's teams
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
             AddTeamsToDatabase(status, studentsJSON, teamX, courseID, userId, 1);      //update database with their new team
             System.out.println("Added extra");

                 teamCounter++;

                  }

     }
//_____________________________________________________________________________________________________________________________________________________________________//
//AddTeamsToDatabase method - This method will change the specified student's teamID and update the database
//_____________________________________________________________________________________________________________________________________________________________________/


public void AddTeamsToDatabase(boolean status, JSONArray studentsJSON, int teamId, int courseId, int userId, int i) {



   if (status == true){ //if it is in the database, update the student object with the new teamId.


        studentService.setTeamForStudentByUserIdAndCourseId(userId,courseId,teamId); //add tigers to two students
      keepTrackOfStudent++;
   

     } else { //if it is not in the database, indicate so. likely change to request like 404

        System.out.println("The entered Id : '" + studentsJSON.get(keepTrackOfStudent) + "' does not exist in the list of students in the class.");
        keepTrackOfStudent++;
        i--;

       }     
}

//_____________________________________________________________________________________________________________________________________________________________________//
//Auto Generate Team Names. Create a random teamId. Id this is not in the database, use it. If it is in the database, create a new one.
//_____________________________________________________________________________________________________________________________________________________________________/

int generateTeamID = 0;

public int autoGenerateTeamName() { 

   int j = 0;

   while (j == 0) {

   Random rand = new Random();
   List<Student> z = studentService.findAll();

   generateTeamID = rand.nextInt(z.size() * 10); //even if each student has  a unique team, this will still generate a unique teamId based on database size
   List<Student> s = studentService.findStudentsByTeamID(generateTeamID); //check to see if this team id already exists in the database

   if (Objects.isNull(s)) { //if it doesn't exist

      System.out.println("The team does not already exist in the database");
      
      j = 1;

   }

}

return generateTeamID;
  
   
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
      }