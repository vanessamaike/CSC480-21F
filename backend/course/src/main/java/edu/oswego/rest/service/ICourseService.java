package edu.oswego.rest.service;

import edu.oswego.rest.objects.Course;

import java.util.List;

public interface ICourseService {
    Course save(Course course);
    List<Course> findAll();
    Course findOne(int courseId);
    Course update(Course course);
    Course delete(Course course);
    void deleteAll();
    int generateUniqueRandomId();
}