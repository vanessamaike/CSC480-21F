package edu.oswego.util.service.impl;

import edu.oswego.util.dao.IAssignmentDAO;
import edu.oswego.util.dao.impl.AssignmentDAO;
import edu.oswego.util.objects.Assignment;
import edu.oswego.util.service.IAssignmentService;

import java.util.List;

public class AssignmentService implements IAssignmentService {

    IAssignmentDAO assignmentDao;
    public AssignmentService()
    {
        assignmentDao = new AssignmentDAO();
    }
    @Override
    public Assignment save(Assignment assignment) {
        int id = assignmentDao.save(assignment);
        return assignmentDao.findOne(id);
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
    public List<Assignment> findAssignmentsByCourseId(int courseId){
        return assignmentDao.findAssignmentsByCourseId(courseId);
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