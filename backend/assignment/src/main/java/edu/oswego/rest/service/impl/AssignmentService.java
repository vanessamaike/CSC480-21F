package edu.oswego.rest.service.impl;

import edu.oswego.rest.dao.IAssignmentDAO;
import edu.oswego.rest.dao.impl.AssignmentDAO;
import edu.oswego.rest.objects.Assignment;
import edu.oswego.rest.service.IAssignmentService;

import java.util.List;

public class AssignmentService implements IAssignmentService {

    IAssignmentDAO assignmentDao;
    public AssignmentService()
    {
        assignmentDao = new AssignmentDAO();
    }
    @Override
    public Assignment save(Assignment assignment) {
        assignmentDao.save(assignment);
        return assignmentDao.findOne(assignment.getAssignmentID());
    }
    @Override
    public List<Assignment> findAll() {
        return assignmentDao.findAll();
    }

    @Override
    public Assignment findOne(int assignmentId) {
        return assignmentDao.findOne(assignmentId);
    }

    @Override
    public Assignment update(Assignment assignment) {
        assignmentDao.update(assignment);
        return assignmentDao.findOne(assignment.getAssignmentID());
    }

    @Override
    public Assignment delete(Assignment assignment) {
        assignmentDao.delete(assignment);
        return assignment;
    }

    @Override
    public void deleteAll() {
        assignmentDao.deleteAll();
    }
}