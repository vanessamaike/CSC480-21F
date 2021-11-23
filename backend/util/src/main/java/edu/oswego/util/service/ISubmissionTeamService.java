package edu.oswego.util.service;

import edu.oswego.util.objects.Submission_Team;

import java.util.List;

public interface ISubmissionTeamService {
    void save(Submission_Team cts);
    List<Submission_Team> findByTeamIdAndAssignmentId(int tID, int aID);
    List<Submission_Team> findBySubmissionIdAndAssignmentId(int sID, int aID);

    List<Submission_Team> findBySubmission(int sID);
    Submission_Team update(Submission_Team subTeam);
    Submission_Team delete(Submission_Team cts);
}
