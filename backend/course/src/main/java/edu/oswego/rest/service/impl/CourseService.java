package edu.oswego.rest.service.impl;

import edu.oswego.rest.dao.ICourseDAO;
import edu.oswego.rest.dao.impl.CourseDAO;
import edu.oswego.rest.objects.Course;
import edu.oswego.rest.service.ICourseService;

import java.util.List;

public class CourseService implements ICourseService {

    ICourseDAO courseDao;
    public CourseService()
    {
        courseDao = new CourseDAO();
    }
    @Override
    public Course save(Course course) {
        courseDao.save(course);
        return courseDao.findOne(course.getCourseID());
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