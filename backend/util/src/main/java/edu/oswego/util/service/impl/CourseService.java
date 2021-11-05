package edu.oswego.util.service.impl;

import edu.oswego.util.dao.ICourseDAO;
import edu.oswego.util.dao.impl.CourseDAO;
import edu.oswego.util.objects.Course;
import edu.oswego.util.service.ICourseService;

import java.util.List;

public class CourseService implements ICourseService {

    ICourseDAO courseDao;
    public CourseService()
    {
        courseDao = new CourseDAO();
    }

    @Override
    public int generateUniqueRandomId(){
        return courseDao.generateUniqueRandomId();
    }

    @Override
    public Course save(Course course) {
       int id =  courseDao.save(course);
        return courseDao.findOne(id);
    }
    @Override
    public List<Course> findAll() {
        return courseDao.findAll();
    }

    @Override
    public Course findOne(int courseId) {
        return courseDao.findOne(courseId);
    }

    @Override
    public List<Course> findCoursesByUserId(int userId) {
        return courseDao.findCoursesByUserId(userId);
    }

    @Override
    public Course update(Course course) {
        courseDao.update(course);
        return courseDao.findOne(course.getCourseID());
    }

    @Override
    public Course delete(Course course) {
        courseDao.delete(course);
        return course;
    }

    @Override
    public void deleteAll() {
        courseDao.deleteAll();
    }
}