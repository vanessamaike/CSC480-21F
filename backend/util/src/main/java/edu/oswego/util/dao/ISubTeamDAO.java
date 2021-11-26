package edu.oswego.util.dao;

import edu.oswego.util.objects.Submission_Team;

import java.util.List;

public interface ISubTeamDAO {
    void save(Submission_Team cts);
    List<Submission_Team> findAll(int sID);
    List<Submission_Team> findByTeamIdAndAssignmentId(int tID, int aID);
    List<Submission_Team> findBySubmissionIdAndAssignmentId(int sID, int aID);
    void update(Submission_Team cts);
    void delete(Submission_Team cts);
}
