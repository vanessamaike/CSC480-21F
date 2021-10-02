package edu.oswego.rest.dao.impl;


import edu.oswego.rest.dao.ICourseDAO;
import edu.oswego.rest.mapper.CourseMapper;
import edu.oswego.rest.objects.Course;

import java.util.List;

public class CourseDAO extends AbstractDAO<Course> implements ICourseDAO {

    @Override
    public int save(Course course) {
        StringBuilder sql = new StringBuilder("INSERT INTO course (courseId, title, code,ends, settings)");
        sql.append(" VALUES(?, ?, ?, ?, ? )");
        return insert(sql.toString(), course.getCourseID(), course.getTitle(),course.getCode(),
                course.getEndDate(),course.getSettings());
    }

    @Override
    public List<Course> findAll() {
        String sql = "SELECT * FROM course";
        List<Course> course = query(sql, new CourseMapper());
        return course.isEmpty() ? null : course;
    }

    @Override
    public Course findOne(int courseId) {
        String sql = "SELECT * FROM course WHERE courseID = ?";
        List<Course> course = query(sql, new CourseMapper(), courseId);
        return course.isEmpty() ? null : course.get(0);
    }

    @Override
    public void update(Course course) {
        StringBuilder sql = new StringBuilder("UPDATE course SET title = ?, code = ?, ends = ?, " +
                "settings = ? WHERE courseID = ?");
        update(sql.toString(), course.getTitle(),course.getCode() ,course.getEndDate(),course.getSettings());
    }

    @Override
    public void delete(Course course) {
        String sql = "DELETE FROM course WHERE courseID = ?";
        update(sql, course.getCourseID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM course";
        update(sql);
    }


}
