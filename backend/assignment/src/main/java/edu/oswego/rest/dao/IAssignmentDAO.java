package edu.oswego.rest.dao;

import edu.oswego.rest.objects.Assignment;

import java.util.List;

public interface IAssignmentDAO {
    int save(Assignment assignment);
    List<Assignment> findAll();
    Assignment findOne(int assignmentId);
    void update(Assignment assignment);
    void delete(Assignment assignment);
    void deleteAll();

}
