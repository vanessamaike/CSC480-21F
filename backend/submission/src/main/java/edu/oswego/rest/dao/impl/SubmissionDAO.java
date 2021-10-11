package edu.oswego.rest.dao.impl;



import edu.oswego.rest.dao.ISubmissionDAO;
import edu.oswego.rest.mapper.SubmissionMapper;
import edu.oswego.rest.objects.Submission;

import java.util.List;

public class SubmissionDAO extends AbstractDAO<Submission> implements ISubmissionDAO {

    @Override
    public int save(Submission submission) {
        StringBuilder sql = new StringBuilder("INSERT INTO submission (submissionID, pdfDoc, signOff, teamID)");
        sql.append(" VALUES(?, ?, ?, ?)");
        return insert(sql.toString(), submission.getSubmissionID(), submission.getPdfDoc(),submission.getSignOff(),submission.getTeamID());
    }

    @Override
    public List<Submission> findAll() {
        String sql = "SELECT * FROM submission";
        List<Submission> submission = query(sql, new SubmissionMapper());
        return submission.isEmpty() ? null : submission;
    }

    @Override
    public Submission findOne(int submissionId) {
        String sql = "SELECT * FROM submission WHERE submissionID = ?";
        List<Submission> submission = query(sql, new SubmissionMapper(), submissionId);
        return submission.isEmpty() ? null : submission.get(0);
    }

    @Override
    public void update(Submission submission) {
        StringBuilder sql = new StringBuilder("UPDATE submission SET pdfDoc = ?, signOff = ?, teamID = ? WHERE submissionID = ?");
        update(sql.toString(), submission.getPdfDoc(),submission.getSignOff(),submission.getTeamID(),submission.getSubmissionID());
    }

    @Override
    public void delete(Submission submission) {
        String sql = "DELETE FROM submission WHERE submissionID = ?";
        update(sql, submission.getSubmissionID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM submission";
        update(sql);
    }


}
