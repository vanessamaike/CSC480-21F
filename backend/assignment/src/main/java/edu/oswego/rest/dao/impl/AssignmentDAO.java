package edu.oswego.rest.dao.impl;

import edu.oswego.rest.dao.IAssignmentDAO;
import edu.oswego.rest.mapper.AssignmentMapper;
import edu.oswego.rest.objects.Assignment;

import java.util.List;

public class AssignmentDAO extends AbstractDAO<Assignment> implements IAssignmentDAO {

    @Override
    public int generateUniqueRandomId()
    {
        String sql = "SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM assignment " +
                "WHERE \"random_number\" NOT IN (SELECT assignmentID FROM assignment) " +
                "LIMIT 1;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int save(Assignment assignment) {
        StringBuilder sql = new StringBuilder("INSERT INTO assignment (assignmentID, pdfDoc, settings, courseID)");
        sql.append(" VALUES(?, ?, ?, ?)");
        int uniqueRandomId = generateUniqueRandomId();
         insert(sql.toString(), uniqueRandomId, assignment.getPdfDoc(),assignment.getSettings(),assignment.getCourseID());
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
        StringBuilder sql = new StringBuilder("UPDATE assignment SET pdfDoc = ?, settings = ?, courseID = ? WHERE assignmentID = ?");
        update(sql.toString(), assignment.getPdfDoc(),assignment.getSettings(),assignment.getCourseID(),assignment.getAssignmentID());
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