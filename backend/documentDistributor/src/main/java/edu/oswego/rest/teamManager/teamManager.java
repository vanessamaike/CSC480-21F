package edu.oswego.rest.teamManager;

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

   @POST
     public void MakeTeamsManually(String payload) throws JsonProcessingException {


        JSONObject obj = new JSONObject(payload);
        JSONArray studentsJSON = obj.getJSONArray("students");
        int teamId = obj.getInt("teamID"); 
      

        for (int i = 0; i < studentsJSON.length(); i++) { //for each studentId in array...


             //Object user = studentsJSON.get(i);
             int userId = obj.getJSONArray("students").getInt(i);
             boolean status = checkIfStudentIsInDatabase(userId); //check the Id and see if it's in the database

             if (status == true){ //if it is in the database, update the student object with the new teamId.

                String studentId = student.getStudentID(); 
                String firstName = student.getFirstName();
                String lastName = student.getLastName();
                String email = student.getEmail();
                float score = student.getScore();
                int courseId = student.getCourseID();
                
                Student studentToUpdate = new Student(studentId, userId, firstName, lastName, email, teamId, score, courseId);
                //String newStudentToUpdate = getStudentAsJson(studentId,userId,firstName,lastName,email,teamId,score,courseId);
                studentService.update(studentToUpdate);


             } else { //if it is not in the database, indicate so

              System.out.println("The entered Id : '" + studentsJSON.get(i) + "' does not exist in the list of students in the class.");

             }
             
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