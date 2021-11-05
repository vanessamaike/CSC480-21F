package edu.oswego.util.dao;

import edu.oswego.util.objects.Course;

import java.util.List;

public interface ICourseDAO {
    int save(Course course);
    List<Course> findAll();
    Course findOne(int courseId);
    List<Course> findCoursesByUserId(int userId);
    void update(Course course);
    void delete(Course course);
    void deleteAll();
    int generateUniqueRandomId();
}
