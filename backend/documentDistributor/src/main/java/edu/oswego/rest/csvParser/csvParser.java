import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;

import edu.oswego.rest.objects.Student;
import edu.oswego.rest.service.IStudentService;
import edu.oswego.rest.service.impl.StudentService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.*;

/**
 * @author John
 * This class handles the parsing for the CSV document containing student information.
 * The path will be change to a randomly generated 32 character string.
 */



@Path("/7gWYf83XRLtqwqYrBokIFkkUbxRZ7OGI")


public class csvParser {


    IStudentService studentService; 
    public csvParser() {
            studentService = new StudentService();
    
        }


   @POST
   public void parseByteArray() throws ClassNotFoundException { //receive byte array from frontEnd

    byte[] bytez = "804985298,Owens,John,J,80,Computer Science BA,CSC480HY1,jowens4@oswego.edu,1st sem senior, 3051 my address boy".getBytes();
    //until received from front-end, here's an example of what one line of the byte array might look like ^

    //byte[] allStudents

    //for (int i = 0; i < byte.length; i++) { //for each line in the byte array

    String csv = new String(bytez); //csv ex: 804985298, Owens, John, J, 80, Computer Science BA, CSC480HY1, jowens4@oswego.edu, 1st sem senior,  3051 my address boy
    
    String[] elements = csv.split(","); //store individual attributes in elements array
    String studentId = elements[0];
    String firstName = elements[2];
    String lastName = elements[1];
    String email = elements[7];

    addToDatabase(studentId, firstName, lastName, email);

    //}

	}

    public void addToDatabase(String sId, String fn, String ln, String em) { //add student to student object in database

        Student studentToAdd = new Student(sId, 0, fn, ln, em, 0, (float) 0.0, 0); //set course Id and userID to zero for now until code received from GUI team
        studentService.save(studentToAdd);
        System.out.println("\n\n Successfully added Student to Database");

    }
}