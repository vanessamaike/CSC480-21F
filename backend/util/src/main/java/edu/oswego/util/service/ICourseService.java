package edu.oswego.util.service;

import edu.oswego.util.objects.Course;

import java.util.List;

public interface ICourseService {
    Course save(Course course);
    List<Course> findAll();
    Course findOne(int courseId);
    List<Course> findCoursesByUserId(int userId);
    List<Course> findCoursesByStudent_UserID(int userId);
    Course update(Course course);
    Course delete(Course course);
    void deleteAll();
    int generateUniqueRandomId();
}