package edu.oswego.util.service.impl;


import edu.oswego.util.dao.IReviewDAO;
import edu.oswego.util.dao.impl.ReviewDAO;
import edu.oswego.util.objects.Review;
import edu.oswego.util.objects.Submission;
import edu.oswego.util.service.IReviewService;

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
    public List<Review> findAllByAssId(int assId){
        return reviewDao.findAllByAssId(assId);
    }

    @Override
    public Review findOne(int reviewId) {
        return reviewDao.findOne(reviewId);
    }

    @Override
    public Review findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(int submissionId, int assignmentId, int teamId)
    {
        return reviewDao.findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(submissionId,assignmentId,teamId);
    }

    @Override
    public List<Review> findReviewsBySubmissionIdAndAssignmentIdAndTeamId(int submissionId, int assignmentId, int teamId){
        return reviewDao.findReviewsBySubmissionIdAndAssignmentIdAndTeamId(submissionId,assignmentId,teamId);
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
