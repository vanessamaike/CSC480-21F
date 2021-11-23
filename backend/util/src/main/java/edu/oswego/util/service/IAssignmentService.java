package edu.oswego.util.service;

import edu.oswego.util.objects.Assignment;

import java.util.List;

public interface IAssignmentService {
    Assignment save(Assignment assignment);
    List<Assignment> findAll();
    Assignment findOne(int assignmentId);
    List<Assignment> findAssignmentsByCourseId(int courseId);
    Assignment update(Assignment assignment);
    Assignment delete(Assignment assignment);
    void deleteAll();
}
