package edu.oswego.rest.dao;

import edu.oswego.rest.objects.Course;

import java.util.List;

public interface ICourseDAO {
    int save(Course course);
    List<Course> findAll();
    Course findOne(int courseId);
    void update(Course course);
    void delete(Course course);
    void deleteAll();
    int generateUniqueRandomId();
}
