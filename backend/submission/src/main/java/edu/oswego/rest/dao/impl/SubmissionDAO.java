package edu.oswego.rest.dao.impl;



import edu.oswego.rest.dao.ISubmissionDAO;
import edu.oswego.rest.mapper.SubmissionMapper;
import edu.oswego.rest.objects.Submission;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

public class SubmissionDAO extends AbstractDAO<Submission> implements ISubmissionDAO {

    @Override
    public int generateUniqueRandomId()
    {
        String sql = "SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM submission " +
                "WHERE \"random_number\" NOT IN (SELECT submissionID FROM submission) " +
                "LIMIT 1;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int save(Submission submission) {
        StringBuilder sql = new StringBuilder("INSERT INTO submission (submissionID, pdfDoc, signOff, teamID)");
        sql.append(" VALUES(?, ?, ?, ?)");


        int uniqueRandomId = generateUniqueRandomId();

        InputStream targetStream = new ByteArrayInputStream(submission.getPdfDoc());

        insert(sql.toString(), uniqueRandomId, targetStream,submission.getSignOff(),submission.getTeamID());
        return uniqueRandomId;
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
