package edu.oswego.rest.controller.review;

import com.ibm.websphere.security.jwt.JwtConsumer;

import edu.oswego.util.objects.Assignment;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.objects.Review;
import edu.oswego.util.objects.Student;
import edu.oswego.util.service.IAssignmentService;
import edu.oswego.util.service.ICourseService;
import edu.oswego.util.service.IReviewService;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.impl.AssignmentService;
import edu.oswego.util.service.impl.CourseService;
import edu.oswego.util.service.impl.ReviewService;
import edu.oswego.util.service.impl.StudentService;
import edu.oswego.util.utility.QualityCheck;
import edu.oswego.util.utility.ResponseMessage;
import edu.oswego.util.utility.SD;

// Json-B
import javax.json.*;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.*;

import java.nio.file.Files;

import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Path("/review")
public class ReviewAPI {
    private static final long serialVersionUID = 1L;
    private final IAssignmentService assService;
    private final IReviewService reviewService;
    private final IStudentService studentService;
    private final ICourseService courseService;
    private final Jsonb jsonb = JsonbBuilder.create();
    private final authObject a = new authObject();
    private final String unauth = "Unauthorized: You mus log in to view this page.";
    private final String forbid = "Forbidden: You do not have access to this page.";
    private final String errorm = "An error occurred: ";
    private final String badnum = "The ID number provided was not formatted properly.";


    public ReviewAPI() {
        assService = new AssignmentService();
        reviewService = new ReviewService();
        studentService = new StudentService();
        courseService = new CourseService();
    }

    @GET
    public Response getAllReviews(@HeaderParam("jwtToken") String jwtToken){
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")){
                List<Review> listOfReviews = reviewService.findAll();
                String res = jsonb.toJson(listOfReviews);
                if(listOfReviews != null) return new ResponseMessage().sendMessage(res, 200);
                else return new ResponseMessage().sendMessage("No reviews found.", 404);
            }
            else if(role.equals("student")){
                return new ResponseMessage().sendMessage(forbid, 403);
            }
            else {
                return new ResponseMessage().sendMessage(unauth, 401);
            }
        } catch (Exception e){
            return new ResponseMessage().sendMessage(errorm+e, 500);

        }
    }

    @GET
    @Path("/{reviewId}")
    public Response getSpecificAnswer(@PathParam("reviewId") String _reviewId, @HeaderParam("jwtToken") String jwtToken){
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            int reviewId = Integer.parseInt(_reviewId);
            Review review = reviewService.findOne(reviewId);
            if(role.equals("professor")){
                String res = jsonb.toJson(review);
                if(review != null) return new ResponseMessage().sendMessage(res, 200);

                else return new ResponseMessage().sendMessage("No review found.", 404);

            }
            else if(role.equals("student")){
                Assignment ass = assService.findOne(review.getAssignmentId());
                if(ass.isReviewStage()){
                    return new ResponseMessage().sendMessage(jsonb.toJson(review), 200);
                }
                else return new ResponseMessage().sendMessage(forbid, 403);
            }
            else {
                return new ResponseMessage().sendMessage(unauth, 401);
            }
        } catch (NumberFormatException ne){
            return new ResponseMessage().sendMessage(badnum, 500);
        } catch (Exception e){
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @GET
    @Path("/reviewsByAssignment/{assignmentId}")
    public Response getReviewsByAssignment(@PathParam("assignmentId") String _assID, @HeaderParam("jwtToken") String jwtToken){
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")){
                List<Review> listOfReviews = reviewService.findAllByAssId(Integer.parseInt(_assID));
                String res = jsonb.toJson(listOfReviews);
                if(listOfReviews != null)
                    return new ResponseMessage().sendMessage(res, 200);
                else
                    return new ResponseMessage().sendMessage("No review found.", 404);
            }
            else if(role.equals("student")){
                return new ResponseMessage().sendMessage(forbid, 403);
            }
            else {
                return new ResponseMessage().sendMessage(unauth, 401);
            }
        } catch (NumberFormatException ne){
            return new ResponseMessage().sendMessage(badnum, 500);
        } catch (Exception e){
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @POST
    public Response postReview(String payload, @HeaderParam("jwtToken") String jwtToken) {
        Review review = jsonb.fromJson(payload, Review.class);
        String res;

        //This section calculates the student name list
        List<Student> allStudents = studentService.findAll();
        String[] students = new String[allStudents.size()*2];
        int i = 0;
        for(Student student : allStudents){
            students[i] = student.getFirstName();
            students[i + 1 ] = student.getLastName();
            i = i + 2;
        }

        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));

            //First we check the standard deviation.
            //The standard deviation limit is specified in the course.
            String courseSettings = courseService.findOne(assService.findOne(review.getAssignmentId()).getCourseID()).getSettings();
            char numerator = courseSettings.charAt(0);
            char denominator = courseSettings.charAt(1);
            double standardDeviation = ((double)numerator)/((double)denominator);
            //We pull all the reviews for this assignment
            ArrayList<Review> reviews = (ArrayList<Review>) reviewService.findAllByAssId(review.getAssignmentId());
            File[] fileArray = new File[reviews.size()];
            //Puts the files retrieved into the array for calculation
            for(int q = 0; q < reviews.size(); q++){
                InputStream is = new ByteArrayInputStream(reviews.get(q).getPdfDoc());
                Files.copy(is, fileArray[q].toPath(), StandardCopyOption.REPLACE_EXISTING);
            }
            InputStream is = new ByteArrayInputStream(review.getPdfDoc());
            File f = new File("");
            Files.copy(is, f.toPath(), StandardCopyOption.REPLACE_EXISTING);

            //TODO we need to replace the values here with a user specified value, if possible
            String scoreREGEX = "TOTAL";
            boolean before = true;
            QualityCheck qc = new QualityCheck();
            SD sCheck = new SD(fileArray, scoreREGEX, before);

            review.setScore(sCheck.getScore(f, standardDeviation));
            review.setSDCheck(sCheck.isOutlier(f, standardDeviation));
            review.setListOfQCWordViolations(qc.QC(review.getPdfDoc(), students));

            if(role.equals("professor") || role.equals("student")){
                review = reviewService.save(review);
                res = jsonb.toJson(review);
                return new ResponseMessage().sendMessage(res, 200);
            }
            else{
                return new ResponseMessage().sendMessage(unauth, 401);
            }
        }  catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @PUT
    @Path("/setSeen/{reviewId}")
    public Response updateReview(@PathParam("reviewId") String _reviewId, @HeaderParam("jwtToken") String jwtToken) {

        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")){
                Review review = reviewService.findOne(Integer.parseInt(_reviewId));
                review.setSeen(true);
                reviewService.update(review);
                return new ResponseMessage().sendMessage(jsonb.toJson(review), 200);
            }
            else if(role.equals("student")){
                return new ResponseMessage().sendMessage(forbid, 403);
            }
            else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (NumberFormatException e){
            return new ResponseMessage().sendMessage(badnum, 500);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

    @DELETE
    @Path("/{reviewId}")
    public Response deleteSpecificReview(@PathParam("reviewId") String _reviewId, @HeaderParam("jwtToken") String jwtToken){
        try {
            JwtConsumer c = new JwtConsumer();
            String role = a.authUser(c.createJwt(jwtToken));
            if(role.equals("professor")){
                int reviewId = Integer.parseInt(_reviewId);
                Review review = reviewService.findOne(reviewId);
                review = reviewService.delete(review);
                String res = jsonb.toJson(review);
                if(review != null)
                    return new ResponseMessage().sendMessage(res, 200);
                else
                    return new ResponseMessage().sendMessage("Review not found.", 404);
            } else if(role.equals("student")){
                return new ResponseMessage().sendMessage(forbid, 403);
            } else
                return new ResponseMessage().sendMessage(unauth, 401);
        } catch (NumberFormatException ne){
            return new ResponseMessage().sendMessage(badnum, 500);
        } catch (Exception e) {
            return new ResponseMessage().sendMessage(errorm+e, 500);
        }
    }

}
