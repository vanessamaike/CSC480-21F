package edu.oswego.rest.course;

import com.google.gson.JsonObject;
import edu.oswego.rest.objects.Course;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import java.sql.Date;
import java.time.DateTimeException;
import java.time.LocalDate;

/**
 * @author Phoenix
 * This resource creates a course object then stores it into the database. If the
 * course already exists, then it will overwrite the data with the new course as
 * long as the course IDs match. This resource also generates course IDs to be
 * used when creating a new course.
 *
 * The path is a randomly generated 32 character string.
 */
@Path("/rb5b8b2adiqjelp9xpkc2sd95msifh12")
public class CourseCreator {

    //I want this here, so it is easy to find later.
    private final int settingsLength = 8;
    /**
     * This method takes the info given to it to create a new course.
     * @param name The name of the course.
     * @param code The code of the course.
     * @param end The date the course will end.
     * @param set The string that represents the settings.
     * @return A GSON JSON with the boolean value of the result.
     */
    @PUT
    public JsonObject putRequest(String id, String title, String name, String code, String end, String set){
        //TODO This method needs to ensure authentication
        JsonObject result = new JsonObject();
        try{

            //This section of code parses the input provided and is the cause for the try/catch
            int cid = Integer.parseInt(id);
            Date courseEnd = Date.valueOf(LocalDate.parse(end));
            if(set.length()!=settingsLength) throw new StringIndexOutOfBoundsException();
            //Then creates a new course object
            Course c = new Course(cid,title, name, code, courseEnd, set);
            //And tells the course to insert itself.
            if(c.insertCourse()) result.addProperty("result", "true");
            else result.addProperty("result", "false");

        } catch (NumberFormatException fe){
            System.out.println("Course ID provided was not a proper integer.");
            result.addProperty("result", "false");
        } catch (DateTimeException te){
            System.out.println("Date provided did not parse.");
            result.addProperty("result", "false");
        } catch (NullPointerException ne){
            System.out.println("Date provided was null or did not parse.");
            result.addProperty("result", "false");
        } catch (StringIndexOutOfBoundsException ie){
            System.out.println("Settings was not of expected length.");
            result.addProperty("result", "false");
        }
        return result;
    }

}
