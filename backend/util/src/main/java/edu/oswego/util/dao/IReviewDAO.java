package edu.oswego.util.dao;

import edu.oswego.util.objects.Review;
import edu.oswego.util.objects.Submission;

import java.util.List;

public interface IReviewDAO {
    int save(Review review);
    List<Review> findAll();
    Review findOne(int reviewId);
    Review findTheLatestReviewBySubmissionIdAndAssignmentIdAndTeamId(int submissionId, int assignmentId, int teamId);
    List<Review> findReviewsBySubmissionIdAndAssignmentIdAndTeamId(int submissionId, int assignmentId, int teamId);
    void update(Review review);
    void delete(Review review);
    void deleteAll();
    int generateUniqueRandomId();

    List<Review> findAllByAssId(int assId);
}
