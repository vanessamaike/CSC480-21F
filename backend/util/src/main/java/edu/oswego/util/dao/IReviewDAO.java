package edu.oswego.util.dao;

import edu.oswego.util.objects.Review;

import java.util.List;

public interface IReviewDAO {
    int save(Review review);
    List<Review> findAll();
    Review findOne(int reviewId);
    void update(Review review);
    void delete(Review review);
    void deleteAll();
    int generateUniqueRandomId();
}
