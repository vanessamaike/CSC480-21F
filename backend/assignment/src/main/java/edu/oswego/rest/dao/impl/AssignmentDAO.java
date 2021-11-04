package edu.oswego.rest.dao.impl;

import edu.oswego.rest.dao.IAssignmentDAO;
import edu.oswego.rest.mapper.AssignmentMapper;
import edu.oswego.rest.objects.Assignment;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

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
        StringBuilder sql = new StringBuilder("INSERT INTO assignment (assignmentID, pdfDoc, settings, courseID, " +
                "title, isTeamed, reviewStage, dueDateTime, reviewDateTime)");
        sql.append(" VALUES(?, ?, ?, ?, ? , ? , ?, ?, ? )");
        int uniqueRandomId = generateUniqueRandomId();
        InputStream targetStream = new ByteArrayInputStream(assignment.getPdfDoc());
         insert(sql.toString(), uniqueRandomId, targetStream,
                 assignment.getSettings(),assignment.getCourseID(),
                 assignment.getTitle(), assignment.isTeamed(), assignment.isReviewStage(),
                 assignment.getDueDateTime() , assignment.getReviewDateTime());
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
    public void update(Assignment assignment) {
        StringBuilder sql = new StringBuilder("UPDATE assignment SET pdfDoc = ?, settings = ?, courseID = ? ," +
                " title = ?, isTeamed = ?, reviewStage = ? , dueDateTime = ? , " +
                " reviewDateTime = ? WHERE assignmentID = ?");
        InputStream targetStream = new ByteArrayInputStream(assignment.getPdfDoc());
        update(sql.toString(),targetStream,assignment.getSettings(),assignment.getCourseID(),
                assignment.getTitle(), assignment.isTeamed(), assignment.isReviewStage(),
                assignment.getDueDateTime(),assignment.getReviewDateTime(),assignment.getAssignmentID());
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