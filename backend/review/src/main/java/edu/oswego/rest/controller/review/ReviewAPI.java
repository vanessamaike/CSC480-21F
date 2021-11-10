package edu.oswego.rest.controller.review;

import com.fasterxml.jackson.core.JsonProcessingException;

import com.google.gson.Gson;
import edu.oswego.util.objects.Review;

import edu.oswego.util.objects.Student;
import edu.oswego.util.service.IReviewService;
import edu.oswego.util.service.IStudentService;
import edu.oswego.util.service.impl.ReviewService;
import edu.oswego.util.service.impl.StudentService;
import edu.oswego.util.utility.QualityCheck;
import edu.oswego.util.utility.SD;


// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import java.io.File;


import java.io.IOException;

import java.nio.file.Files;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/review")
public class ReviewAPI {
    private static final long serialVersionUID = 1L;
    private IReviewService reviewService;
    private IStudentService studentService;
    private Jsonb jsonb = JsonbBuilder.create();


    public ReviewAPI() {
        reviewService = new ReviewService();
        studentService = new StudentService();
    }

    @GET
    public String getAllReviews(){
        //TODO This method needs to ensure authentication
        try {
            List<Review> listOfReviews = reviewService.findAll();
            String res = jsonb.toJson(listOfReviews);
            if(listOfReviews != null) return res;
            else return "There are not any reviews in the database.";
        } catch (NumberFormatException ne){
            System.out.println("There are not any reviews in the database.");
        }
        return null;
    }

    @GET
    @Path("/{reviewId}")
    public String getSpecificAnswer(@PathParam("reviewId") String _reviewId){
        //TODO This method needs to ensure authentication
        try {

            int reviewId = Integer.parseInt(_reviewId);
            Review review = reviewService.findOne(reviewId);
            String res = jsonb.toJson(review);
            if(review != null) return res;
            else return "Review ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Review ID provided was not formatted properly.");
        }
        return null;
    }
    @POST
    public String postReview(String payload) throws IOException {
        Review review = jsonb.fromJson(payload, Review.class);
        String res = "";

        List<Student> allStudents = studentService.findAll();
        String[] students = new String[allStudents.size()*2];

        int i = 0;

        for(Student student : allStudents){
            students[i] = student.getFirstName();
            students[i + 1 ] = student.getLastName();
            i = i + 2;
        }ClassLoader classLoader = this.getClass().getClassLoader();

        /*============= Use this if you want to use local pdf File ============*/
        File pdfFile = new File(classLoader.getResource("a.pdf").getFile());
        byte[] bytes = Files.readAllBytes(pdfFile.toPath());

        /* =================== comment this if you want to use local pdf file ============*/
        //byte[] bytes = review.getPdfDoc();


        /*======================== SD =================================*/

        File f0 = new File(classLoader.getResource("total0.pdf").getFile());
        File f1 = new File(classLoader.getResource("total1.pdf").getFile());
        File f2 = new File(classLoader.getResource("total2.pdf").getFile());
        File f3 = new File(classLoader.getResource("total3.pdf").getFile());
        File f4 = new File(classLoader.getResource("total4.pdf").getFile());

        try {
            SD sCheck = new SD(new File[]{f0,f1,f2,f3,f4}, "TOTAL", true);
            System.out.println(sCheck);
            double score = sCheck.getOutlierScore(f4, 1.99);
            System.out.println("Outlier score: "+score);
        } catch (IOException e) {
            e.printStackTrace();
        }

        /*================ Quality Check ==================*/
        try {
            QualityCheck qc = new QualityCheck();

            HashMap<Integer, String> violations = qc.QC(bytes, students);
            if ( violations.size() > 0) {
                System.out.println("This PDF file is not accepted because it includes some profanity words : ");
                res = "This PDF file is not accepted because it includes some profanity words: ";
                for (Map.Entry value : violations.entrySet()){
                    System.out.println("Key: "+value.getKey() + " & Value: " + value.getValue());
                }
            }
            else{
                System.out.println("This PDF file is accepted to store to database ");
                review = reviewService.save(review);
                res = jsonb.toJson(review);
            }

        } catch (IOException e) {
            e.printStackTrace();
            return e.toString();

        }
        return res;
    }

    @PUT
    @Path("/setSeen/{reviewId}")
    public String updateReview(@PathParam("reviewId") String _reviewId) throws JsonProcessingException {
        try {

            Review review = reviewService.findOne(Integer.parseInt(_reviewId));
            review.setSeen(true);
            reviewService.update(review);
            return jsonb.toJson(review);
        } catch (NumberFormatException e){
            return "Review ID provided was not formatted properly.";
        }
    }

    @DELETE
    @Path("/{reviewId}")
    public String deleteSpecificReview(@PathParam("reviewId") String _reviewId){
        //TODO This method needs to ensure authentication
        try {

            int reviewId = Integer.parseInt(_reviewId);
            Review review = reviewService.findOne(reviewId);
            review = reviewService.delete(review);
            String res = jsonb.toJson(review);
            if(review != null) return res;
            else return "Review ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Review ID provided was not formatted properly.");
        }
        return null;
    }
}
