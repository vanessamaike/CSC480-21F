package edu.oswego.rest.service.impl;


import edu.oswego.rest.dao.IReviewDAO;
import edu.oswego.rest.dao.impl.ReviewDAO;
import edu.oswego.util.objects.Review;
import edu.oswego.rest.service.IReviewService;

import java.util.List;

public class ReviewService implements IReviewService {

    IReviewDAO reviewDao;
    public ReviewService()
    {
        reviewDao = new ReviewDAO();
    }
    @Override
    public Review save(Review review) {
        int id = reviewDao.save(review);
        return reviewDao.findOne(id);
    }
    @Override
    public List<Review> findAll() {
        return reviewDao.findAll();
    }

    @Override
    public Review findOne(int reviewId) {
        return reviewDao.findOne(reviewId);
    }

    @Override
    public Review update(Review review) {
        reviewDao.update(review);
        return reviewDao.findOne(review.getReviewID());
    }

    @Override
    public Review delete(Review review) {
        reviewDao.delete(review);
        return review;
    }

    @Override
    public void deleteAll() {
        reviewDao.deleteAll();
    }
}
