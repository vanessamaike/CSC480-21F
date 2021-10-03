package edu.oswego.rest.service;

import edu.oswego.rest.objects.Assignment;

import java.util.List;

public interface IAssignmentService {
    Assignment save(Assignment assignment);
    List<Assignment> findAll();
    Assignment findOne(int assignmentId);
    Assignment update(Assignment assignment);
    Assignment delete(Assignment assignment);
    void deleteAll();
}
