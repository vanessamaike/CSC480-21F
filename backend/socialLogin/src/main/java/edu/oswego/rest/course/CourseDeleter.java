package edu.oswego.rest.course;

import edu.oswego.rest.objects.Course;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.ws.rs.DELETE;
import javax.ws.rs.Path;

/**
 * @author Phoenix
 * This class deletes courses from the database.
 */
@Path("/ody7xdte1odso7honpje9vv8bxj8jvm1")
public class CourseDeleter {

    /**
     * This method removes the course from the database.
     * @param courseID The ID of the course to be removed.
     * @return True if the operation was successful, else false.
     */
    @DELETE
    public boolean removeCourse(String courseID){
        //TODO This method needs to ensure authentication
        try {
            int cid = Integer.parseInt(courseID);
            Course c = new Course(cid);
            if(c.getCourseID()>0) return c.removeCourse();
        } catch (NumberFormatException ne){
            System.out.println("Course ID was not formatted properly.");
        }
        return false;
    }
}
