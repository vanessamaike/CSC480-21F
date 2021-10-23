package edu.oswego.rest.dao.impl;



import edu.oswego.rest.dao.IReviewDAO;
import edu.oswego.rest.mapper.ReviewMapper;
import edu.oswego.rest.objects.Review;

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
        StringBuilder sql = new StringBuilder("INSERT INTO review (reviewId, pdfDoc, signOff,teamId )");
        sql.append(" VALUES(?, ?, ?, ?)");
        int uniqueRandomId = generateUniqueRandomId();

        InputStream targetStream = new ByteArrayInputStream(review.getPdfDoc());

        insert(sql.toString(), uniqueRandomId, targetStream,review.getSignOff(),
                review.getTeamID());
        return uniqueRandomId;
    }

    @Override
    public List<Review> findAll() {
        String sql = "SELECT * FROM review";
        List<Review> review = query(sql, new ReviewMapper());
        return review.isEmpty() ? null : review;
    }

    @Override
    public Review findOne(int reviewId) {
        String sql = "SELECT * FROM review WHERE reviewID = ?";
        List<Review> review = query(sql, new ReviewMapper(), reviewId);
        return review.isEmpty() ? null : review.get(0);
    }

    @Override
    public void update(Review review) {
        StringBuilder sql = new StringBuilder("UPDATE review SET pdfDoc = ?, signOff = ?, teamId = ? WHERE reviewID = ?");
        InputStream targetStream = new ByteArrayInputStream(review.getPdfDoc());

        update(sql.toString(),targetStream, review.getSignOff() ,review.getTeamID(),review.getReviewID());
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
