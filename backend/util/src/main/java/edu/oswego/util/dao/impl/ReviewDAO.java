package edu.oswego.util.dao.impl;



import edu.oswego.util.dao.IReviewDAO;
import edu.oswego.util.mapper.ReviewMapper;
import edu.oswego.util.objects.Review;
import edu.oswego.util.dao.impl.AbstractDAO;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

public class ReviewDAO extends AbstractDAO<Review> implements IReviewDAO {
    @Override
    public int generateUniqueRandomId()
    {

        String sql = "SELECT (IF( (select count(reviewId) from review) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM review WHERE \"random_number\" NOT IN (SELECT reviewId FROM review) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }


    @Override
    public int save(Review review) {
        StringBuilder sql = new StringBuilder("INSERT INTO review (reviewId, " +
                "comments, submissionTime, pdfDoc, signOff, teamID, seen, assId, submissionID," +
                "listOfQCWordViolations, SDCheck, score )");
        sql.append(" VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? ,? , ? , ? )");
        int uniqueRandomId = generateUniqueRandomId();

        InputStream targetStream = new ByteArrayInputStream(review.getPdfDoc());

        insert(sql.toString(), uniqueRandomId, review.getComments(),
                review.getSubmissionTime(), targetStream,
                review.getSignOff(),
                review.getTeamID(), review.isSeen(), review.getAssignmentId(),
                review.getSubmissionID(),review.getListOfQCWordViolations(),
                review.isSDCheck(), review.getScore());
        return uniqueRandomId;
    }

    @Override
    public List<Review> findAll() {
        String sql = "SELECT * FROM review";
        List<Review> review = query(sql, new ReviewMapper());
        return review.isEmpty() ? null : review;
    }

    @Override
    public List<Review> findAllByAssId(int assId){
        String sql = "SELECT * FROM review WHERE assId = ?";
        return query(sql, new ReviewMapper(), assId);
    }

    @Override
    public Review findOne(int reviewId) {
        String sql = "SELECT * FROM review WHERE reviewID = ?";
        List<Review> review = query(sql, new ReviewMapper(), reviewId);
        return review.isEmpty() ? null : review.get(0);
    }

    @Override
    public void update(Review review) {
        StringBuilder sql = new StringBuilder("UPDATE review SET comments = ? " +
                "submissionTime = ?, pdfDoc = ?, signOff = ?, teamID = ? , seen = ?, " +
                "assId = ?, submissionID = ? , listOfQCWordViolations = ? , " +
                "SDCheck = ?, score = ? WHERE reviewID = ?");
        InputStream targetStream = new ByteArrayInputStream(review.getPdfDoc());

        update(sql.toString(),review.getComments(),
                review.getSubmissionTime(), targetStream,
                review.getSignOff() ,review.getTeamID(),
                review.isSeen(), review.getAssignmentId(),review.getSubmissionID(),
                review.getListOfQCWordViolations(),
                review.isSDCheck(), review.getScore(), review.getReviewID());
    }

    @Override
    public void delete(Review review) {
        String sql = "DELETE FROM review WHERE reviewID = ?";
        update(sql, review.getReviewID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM review";
        update(sql);
    }


}