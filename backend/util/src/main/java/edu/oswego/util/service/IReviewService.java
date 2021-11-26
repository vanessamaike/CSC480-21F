package edu.oswego.util.service;

import edu.oswego.util.objects.Review;

import java.util.List;

public interface IReviewService{
    Review save(Review review);
    List<Review> findAll();
    List<Review> findAllByAssId(int assId);
    Review findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(int submissionId, int assignmentId, int teamId);
    List<Review> findReviewsBySubmissionIdAndAssignmentIdAndTeamId(int submissionId, int assignmentId, int teamId);
    Review findOne(int reviewId);
    Review update(Review review);
    Review delete(Review review);
    void deleteAll();
}