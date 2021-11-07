package edu.oswego.rest.course;

import com.google.gson.JsonObject;
import edu.oswego.rest.objects.Course;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * @author Phoenix
 * This resource retrieves the course from the database by its course number.
 * The path is a randomly generated 32 character string.
 */
@Path("/t3ip2io3cztbfp8i99qj0mftrftzxvdj")
public class CourseGetter {

    /**
     * This method will return a course object retrieved from the database.
     * @param courseID The unique course identifier.
     * @return The GSON JSON representation of the course with the requested ID.
     */
    @GET
    public JsonObject getCourse(String courseID, JsonWebToken token){
        //TODO This method needs to ensure authentication
        try {

            int cid = Integer.parseInt(courseID);
            Course c = new Course(cid);
            if(c.getCourseID()>0) return c.toJson();

        } catch (NumberFormatException ne){
            System.out.println("Course ID provided was not formatted properly.");
        }
        return null;
    }
}
