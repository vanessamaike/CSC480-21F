package edu.oswego.util.service.impl;

import edu.oswego.util.dao.impl.SubTeamDAO;
import edu.oswego.util.objects.Submission_Team;
import edu.oswego.util.dao.ISubTeamDAO;
import edu.oswego.util.service.ISubmissionTeamService;

import java.util.List;

public class SubmissionTeamService implements ISubmissionTeamService {

    ISubTeamDAO std;

    public SubmissionTeamService(){ std = new SubTeamDAO(); }

    @Override
    public void save(Submission_Team cts) {
        std.save(cts);
    }

    @Override
    public List<Submission_Team> findByTeamIdAndAssignmentId(int tID, int aID) {
        return  std.findByTeamIdAndAssignmentId(tID,aID);
    }
    @Override
    public List<Submission_Team> findBySubmissionIdAndAssignmentId(int sID, int aID) {
        return  std.findBySubmissionIdAndAssignmentId(sID,aID);
    }
    @Override
    public List<Submission_Team> findBySubmission(int sID) {
        return null;
    }

    @Override
    public Submission_Team update(Submission_Team subTeam) {
        return null;
    }

    @Override
    public Submission_Team delete(Submission_Team cts) {
        return null;
    }

}
