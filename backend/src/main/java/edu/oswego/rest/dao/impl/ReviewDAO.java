package edu.oswego.rest.dao.impl;



import edu.oswego.rest.dao.IReviewDAO;
import edu.oswego.rest.mapper.ReviewMapper;
import edu.oswego.rest.objects.Review;

import java.util.List;

public class ReviewDAO extends AbstractDAO<Review> implements IReviewDAO {

    @Override
    public int save(Review review) {
        StringBuilder sql = new StringBuilder("INSERT INTO review (reviewId, pdfDoc, signOff,teamId )");
        sql.append(" VALUES(?, ?, ?, ?)");
        return insert(sql.toString(), review.getReviewID(), review.getPdfDoc(),review.getSignOff(),
                review.getTeamID());
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
        update(sql.toString(), review.getPdfDoc(),review.getSignOff() ,review.getTeamID());
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
