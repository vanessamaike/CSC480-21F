package edu.oswego.rest.teamManager;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.oswego.rest.objects.Student;
import edu.oswego.rest.service.impl.StudentService;

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
int teamId;

   @POST
   @Path("/manual")
     public void MakeTeamsManually(String payload) throws JsonProcessingException {


        JSONObject obj = new JSONObject(payload);
        JSONArray studentsJSON = obj.getJSONArray("students"); //get array of json of student array
        teamId = obj.getInt("teamID");  //get the teamID
      

        for (int i = 0; i < studentsJSON.length(); i++) { //for each studentId in the array...


             int userId = obj.getJSONArray("students").getInt(i);
             boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database
             AddTeamsToDatabase(status, studentsJSON, studentsJSON, userId, i); //update each student's team
             
        }
        
   }

//_____________________________________________________________________________________________________________________________________________________________________//
//MakeTeamsAutomatically method - accept a String  payload of JSON containing an int titled 'NumberOfTeams' as well as an array of studentId. The 
//method will asign them as teammates randomly
//_____________________________________________________________________________________________________________________________________________________________________//

int teamCounter = -1;
int keepTrackOfStudent = 0;

@POST
@Path("/auto")
     public void MakeTeamsAutomatically(String payload) throws JsonProcessingException { //automatically make teams for students

      JSONObject obj = new JSONObject(payload);
      JSONArray studentsJSON = obj.getJSONArray("students"); //array of students
      JSONArray teamNamesJSON = obj.getJSONArray("teams"); //array of team names
      int numberToSplit = studentsJSON.length() / teamNamesJSON.length();
      keepTrackOfStudent = 0;

      for (int j = 0; j <  teamNamesJSON.length(); j++) { //for each team name

         teamCounter++;

      for (int i = 0; i < numberToSplit; i++) { //split up the team members into even (or as much as possible) teams

         
             int userId = obj.getJSONArray("students").getInt(keepTrackOfStudent); //get first student for example
             boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database

               AddTeamsToDatabase(status, teamNamesJSON, studentsJSON, userId, i); //change those student's teams
      }
            }

            teamCounter = 0;

            while (keepTrackOfStudent < studentsJSON.length()) { //here are all the leftover students who weren't assigned a team
                                                                 //iterate through the teams and assign each student to one team
                                                                 //some teams will have one more member than another, but 
                                                                 //this is expected because the json input didn't have enough teams
         
                                                                 
             int userId = obj.getJSONArray("students").getInt(keepTrackOfStudent); //get first student for example
             boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database           
            AddTeamsToDatabase(status, teamNamesJSON, studentsJSON, userId, 1);      //update database with their new team

                 teamCounter++;

                  }

     }
//_____________________________________________________________________________________________________________________________________________________________________//
//AddTeamsToDatabase method - This method will change the specified student's teamID and update the database
//_____________________________________________________________________________________________________________________________________________________________________/


public void AddTeamsToDatabase(boolean status, JSONArray teamNamesJSON, JSONArray studentsJSON, int userId, int i) {



   if (status == true){ //if it is in the database, update the student object with the new teamId.

      String studentId = student.getStudentID(); 
      String firstName = student.getFirstName();
      String lastName = student.getLastName();
      String email = student.getEmail();
      float score = student.getScore();
      int courseId = student.getCourseID();
      int teamID = teamId;

      if (teamCounter != -1) { //basically, if the teams are being made automatically
                               //else, it is manually
      teamID = teamNamesJSON.getInt(teamCounter); 

      }
      
      Student studentToUpdate = new Student(studentId, userId, firstName, lastName, email, teamID , score, courseId); //add tigers to two students
      studentService.update(studentToUpdate);
      keepTrackOfStudent++;
   

     } else { //if it is not in the database, indicate so. likely change to request like 404

        System.out.println("The entered Id : '" + studentsJSON.get(keepTrackOfStudent) + "' does not exist in the list of students in the class.");
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
          student = studentService.findUserID(userId);

          if (student == null) { //if studentId is not in database, return status as false

              status = false;

          }

          return status;

        }
      }