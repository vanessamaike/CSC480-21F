package edu.oswego.rest.controller.review;

import edu.oswego.rest.utility.QualityCheck;
import edu.oswego.util.objects.Review;
import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.authObject;
import edu.oswego.util.service.IReviewService;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.impl.ReviewService;
import edu.oswego.util.service.impl.StudentService;
import edu.oswego.util.utility.ResponseMessage;
import org.json.JSONArray;
import org.json.JSONObject;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import java.util.Arrays;
import java.util.List;

@Path("/review")
public class ReviewAPI {
    private static final long serialVersionUID = 1L;
    private final IReviewService reviewService;
    private final IStudentService studentService;
    private final Jsonb jsonb = JsonbBuilder.create();
    private final authObject auth = new authObject() ;

    private final List<String> ROLE = Arrays.asList("professor","student");

    public ReviewAPI() {
        reviewService = new ReviewService();
        studentService = new StudentService();
    }


    @POST
    public Response postReviews(String data) {

        JSONObject obj = new JSONObject(data);
        JSONArray payloadJSON ;
        try{
            payloadJSON = obj.getJSONArray("data");
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

        JSONArray listOfReviewsJSON = new JSONArray(payload);
        JSONArray res = new JSONArray();
        for (int j = 0; j < listOfReviewsJSON.length(); j++) {
            JSONObject review_payloadJSON = listOfReviewsJSON.getJSONObject(j);
            Review review = jsonb.fromJson(review_payloadJSON.toString(), Review.class);
            if (review.getPdfDoc().length != 0) {

                //This section calculates the student name list
                List<Student> allStudents = studentService.findAll();
                String[] students = new String[allStudents.size() * 2];
                int i = 0;
                for (Student student : allStudents) {
                    students[i] = student.getFirstName();
                    students[i + 1] = student.getLastName();
                    i = i + 2;
                }

                try {
                    QualityCheck qc = new QualityCheck();
                    review.setListOfQCWordViolations(qc.QC(review.getPdfDoc(), students));
                    review = reviewService.save(review);
                    JSONObject reviewJSON = new JSONObject(review);
                    res.put(reviewJSON);

                } catch (Exception e) {
                    String errorm = "An error occurred: ";
                    return new ResponseMessage().sendMessage(errorm + e, 500);
                }
            }
        }
        return new ResponseMessage().sendMessage(res.toString(), 200);
    }



}