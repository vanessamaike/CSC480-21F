package edu.oswego.util.dao.impl;



import edu.oswego.util.dao.ISubmissionDAO;
import edu.oswego.util.mapper.SubmissionMapper;
import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.Submission;
import edu.oswego.util.dao.impl.AbstractDAO;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import edu.oswego.util.mapper.StudentMapper;

public class SubmissionDAO extends AbstractDAO<Submission> implements ISubmissionDAO {

    @Override
    public int generateUniqueRandomId()
    {

        String sql = "SELECT (IF( (select count(submissionId) from submission) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM submission WHERE \"random_number\" NOT IN (SELECT submissionId FROM submission) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public List<Submission> findAllByAssId(int assId) {
        String sql = "SELECT * FROM submission WHERE isDeleted = false and assId = ?";
        List<Submission> submission = query(sql, new SubmissionMapper(), assId);
        return submission.isEmpty() ? null : submission;
    }

    @Override
    public int save(Submission submission) {
        StringBuilder sql = new StringBuilder("INSERT INTO submission (submissionID, " +
                "comments, submissionTime, pdfDoc, signOff, teamID, seen, listOfQCWordViolations, assId, isDeleted)");
        sql.append(" VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        int uniqueRandomId = generateUniqueRandomId();

        InputStream targetStream = new ByteArrayInputStream(submission.getPdfDoc());

        insert(sql.toString(), uniqueRandomId, submission.getComments(), submission.getSubmissionTime()
                ,targetStream,submission.getSignOff(),submission.getTeamID(), submission.isSeen(),
                submission.getListOfQCWordViolations(), submission.getAssignmentID(), submission.isDeleted());
        return uniqueRandomId;
    }

    @Override
    public List<Student> findAllStudents() {
        String sql = "SELECT * FROM student";
        List<Student> student = query(sql, new StudentMapper());
        return student.isEmpty() ? null : student;
    }

    @Override
    public List<Submission> findAll() {
        String sql = "SELECT * FROM submission where isDeleted = false ";
        List<Submission> submission = query(sql, new SubmissionMapper());
        return submission.isEmpty() ? null : submission;
    }

    @Override
    public Submission findOne(int submissionId) {
        String sql = "SELECT * FROM submission WHERE isDeleted = false and submissionID = ?";
        List<Submission> submission = query(sql, new SubmissionMapper(), submissionId);
        return submission.isEmpty() ? null : submission.get(0);
    }

    @Override
    public Submission findTheLatestSubmissionByAssignmentIdAndTeamId(int assignmentId, int teamId)
    {
        String sql = "SELECT * FROM submission " +
                "WHERE isDeleted = false and assId = ? and submissionTime = " +
                "( SELECT MAX( submissionTime ) FROM submission where teamId = ? );";
        List<Submission> submission = query(sql, new SubmissionMapper(), assignmentId, teamId);
        return submission.isEmpty() ? null : submission.get(0);
    }

    @Override
    public List<Submission> findSubmissionsByAssignmentIdAndTeamId(int assignmentId, int teamId)
    {
        String sql = "SELECT * FROM submission " +
                "WHERE isDeleted = false and assId = ? and teamId = ? ;";
        List<Submission> submission = query(sql, new SubmissionMapper(), assignmentId, teamId);
        return submission.isEmpty() ? null : submission;
    }


    @Override
    public void update(Submission submission) {
        StringBuilder sql = new StringBuilder("UPDATE submission SET comments = ?, " +
                "submissionTime = ?, pdfDoc = ?, signOff = ?, teamID = ? , seen = ?, " +
                "listOfQCWordViolations = ?, assId = ? , isDeleted = ? WHERE submissionID = ?");
        InputStream targetStream = new ByteArrayInputStream(submission.getPdfDoc());
        update(sql.toString(), submission.getComments(),
                submission.getSubmissionTime() ,targetStream,
                submission.getSignOff(),submission.getTeamID(),
                submission.isSeen(), submission.getListOfQCWordViolations(),
                submission.getAssignmentID(),submission.isDeleted(),submission.getSubmissionID());
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