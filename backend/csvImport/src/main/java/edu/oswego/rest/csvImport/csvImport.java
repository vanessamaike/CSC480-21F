package edu.oswego.rest.csvImport;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.json.JSONArray;
import javax.ws.rs.core.MediaType;
import org.json.JSONObject;

import edu.oswego.util.objects.Student;
import edu.oswego.util.service.impl.StudentService;


/**
 * @author John
 * This class handles the parsing for the CSV document containing student information.
 */


@Produces(MediaType.APPLICATION_JSON)

@Path("/parse")

public class csvImport {

    Student student = new Student();
    StudentService studentService = new StudentService();


   @POST
   public int parse(String payload) throws ClassNotFoundException, JsonProcessingException { //receive json array from frontEnd. Ask John for exact input if unsure

    JSONObject obj = new JSONObject(payload);
    JSONArray studentsJSON = obj.getJSONArray("CSV_Contents");  //json array of csv contents
    int courseID = obj.getInt("courseID");
     for (int i = 0; i < studentsJSON.length(); i++) {  //for each student

        String pay = studentsJSON.get(i).toString();
        List<String> individualStudent = Arrays.asList(pay.split(",")); //get individual lines of singular student

    if (individualStudent.size() != 10) {

        System.out.println("Hey! You Uploaded the Wrong CSV! Why are there not 10 commas in this line?");
        
        return 206;
 
    } else {
        HashMap<String, String> hashmap = new HashMap<String, String>();

            for (int z = 0; z < individualStudent.size(); z++) { //for each individual line of student, get token only

                 List<String> individualTokens = Arrays.asList(individualStudent.get(z).split(":")); //parse out :
                 List<String> individualTokensWithoutExcess = Arrays.asList(individualTokens.get(1).split("\"\"")); //get token only: eg: 804985298
                 List<String> individualTokensKey = Arrays.asList(individualTokens.get(0).split("\"\"")); //get key of token only e.g: studentId

                 removeSpecialCharacters(individualTokensKey, individualTokensWithoutExcess, z, hashmap);        
        }
        
        addToDatabase(hashmap.get("\"StudentID\""), hashmap.get("\"FirstName\""), hashmap.get("\"LastName\""), hashmap.get("\"Email\""),courseID);

     }
    }

     return 202;

	}


    public void removeSpecialCharacters(List<String> individualTokensKey, List<String> individualTokensWithoutExcess, int z, HashMap<String, String> hashmap) {  //remove special characters


        char a = individualTokensKey.get(0).charAt(0); //if first character is beginning of json with a '{', remove it

        if (a == '}' || a == '{'){

            hashmap.put(individualTokensKey.get(z).substring(1), individualTokensWithoutExcess.get(0)); //add student information to hashmap
            
        }
        else { //add studnet information to hashmap

         hashmap.put(individualTokensKey.get(0), individualTokensWithoutExcess.get(0)); 

        }
    }


    public void addToDatabase(String sId, String fn, String ln, String em, int courseId) { //add student to student object in database

        Student studentToAdd = makeStudentWithoutSpecialCharacters(sId, fn, ln, em);
        studentToAdd = studentService.save(studentToAdd);
        studentService.setCourseForStudent(studentToAdd.getUserID(),courseId);
        System.out.println("\n\n Successfully added Student to Database");       
    }

    public Student makeStudentWithoutSpecialCharacters(String sId, String fn, String ln, String em) { 

        String studentIDwithQuotes = sId.replace("}", "");
        String studentID = studentIDwithQuotes.replace("\"", "");
        String firstName = fn.replace("\"", "");
        String lastName = ln.replace("\"", "");
        String email = em.replace("\"", "");
        Student studentToAdd = new Student(studentID, 0, firstName, lastName, email); //userId will be changed in backend
        return studentToAdd;

    }
}