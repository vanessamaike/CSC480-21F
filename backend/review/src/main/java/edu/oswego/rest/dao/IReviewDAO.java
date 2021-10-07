package edu.oswego.rest.dao;

import edu.oswego.rest.objects.Review;

import java.util.List;

public interface IReviewDAO {
    int save(Review review);
    List<Review> findAll();
    Review findOne(int reviewId);
    void update(Review review);
    void delete(Review review);
    void deleteAll();
}
