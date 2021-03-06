package edu.oswego.util.dao.impl;

import edu.oswego.util.dao.IAssignmentDAO;
import edu.oswego.util.mapper.AssignmentMapper;
import edu.oswego.util.objects.Assignment;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import edu.oswego.util.dao.impl.AbstractDAO;
public class AssignmentDAO extends AbstractDAO<Assignment> implements IAssignmentDAO {

    @Override
    public int generateUniqueRandomId()
    {
        String sql = "SELECT (IF( (select count(assignmentId) from assignment) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM assignment WHERE \"random_number\" NOT IN (SELECT assignmentId FROM assignment) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);

        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int save(Assignment assignment) {
        StringBuilder sql = new StringBuilder("INSERT INTO assignment (assignmentID, title," +
                " reviewStage,courseID, solutionPdfDoc, peerReviewPdfDoc, settings, isDraft, " +
                "publishDateTime, solutionDueDateTime, peerReviewDueDateTime,solutionPdfFileName," +
                " peerReviewPdfFileName, resultStage)");
        sql.append(" VALUES(?, ?, ?, ?, ? , ? , ?, ? ,? ,? ,?, ?, ?, ? )");
        int uniqueRandomId = generateUniqueRandomId();
        InputStream solutionPdfDoc = new ByteArrayInputStream(assignment.getSolutionPdfDoc());
        InputStream peerReviewPdfDoc = new ByteArrayInputStream(assignment.getPeerReviewPdfDoc());
         insert(sql.toString(), uniqueRandomId, assignment.getTitle(),
                 assignment.isReviewStage(), assignment.getCourseID(), solutionPdfDoc,
                 peerReviewPdfDoc, assignment.getSettings(),assignment.isDraft(),
                 assignment.getPublishDateTime(), assignment.getSolutionDueDateTime(), assignment.getPeerReviewDueDateTime(),
                 assignment.getSolutionPdfFileName(),assignment.getPeerReviewPdfFileName(), assignment.isResultStage());
        return uniqueRandomId;
    }

    @Override
    public List<Assignment> findAll() {
        String sql = "SELECT * FROM assignment";
        List<Assignment> assignments = query(sql, new AssignmentMapper());
        return assignments.isEmpty() ? null : assignments;
    }

    @Override
    public Assignment findOne(int assignmentId) {
        String sql = "SELECT * FROM assignment WHERE assignmentID = ?";
        List<Assignment> assignment = query(sql, new AssignmentMapper(), assignmentId);
        return assignment.isEmpty() ? null : assignment.get(0);
    }

    @Override
    public List<Assignment> findAssignmentsByCourseId(int courseId)
    {
        String sql = "SELECT * FROM assignment WHERE courseID = ?";
        List<Assignment> assignments = query(sql, new AssignmentMapper(), courseId);
        return assignments.isEmpty() ? null : assignments;
    }

    @Override
    public void update(Assignment assignment) {
        StringBuilder sql = new StringBuilder("UPDATE assignment SET title = ?, reviewStage = ? ," +
                " courseID = ? ,solutionPdfDoc = ?, peerReviewPdfDoc = ?, settings = ?, isDraft = ?, " +
                " publishDateTime = ? , solutionDueDateTime = ? ,peerReviewDueDateTime = ?, " +
                " solutionPdfFileName = ? , peerReviewPdfFileName = ? , resultStage = ? WHERE assignmentID = ?");
        InputStream solutionPdfDoc = new ByteArrayInputStream(assignment.getSolutionPdfDoc());
        InputStream peerReviewPdfDoc = new ByteArrayInputStream(assignment.getPeerReviewPdfDoc());
        update(sql.toString(),assignment.getTitle(),
                assignment.isReviewStage(), assignment.getCourseID(), solutionPdfDoc,
                peerReviewPdfDoc, assignment.getSettings(),assignment.isDraft(),
                assignment.getPublishDateTime(), assignment.getSolutionDueDateTime(),
                assignment.getPeerReviewDueDateTime(), assignment.getSolutionPdfFileName(),
                assignment.getPeerReviewPdfFileName(), assignment.isResultStage(),assignment.getAssignmentID());
    }

    @Override
    public void delete(Assignment assignment) {
        String sql = "DELETE FROM assignment WHERE assignmentID = ?";
        update(sql, assignment.getAssignmentID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM assignment";
        update(sql);
    }

}