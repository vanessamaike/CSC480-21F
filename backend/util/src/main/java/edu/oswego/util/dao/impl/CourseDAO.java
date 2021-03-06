package edu.oswego.util.dao.impl;


import edu.oswego.util.dao.ICourseDAO;
import edu.oswego.util.mapper.CourseMapper;
import edu.oswego.util.mapper.Course_Team_Student_Mapper;
import edu.oswego.util.objects.Course;
import edu.oswego.util.dao.impl.AbstractDAO;
import edu.oswego.util.objects.Course_Team_Student;
import edu.oswego.util.objects.Team;

import java.util.ArrayList;
import java.util.List;

public class CourseDAO extends AbstractDAO<Course> implements ICourseDAO {

    @Override
    public int generateUniqueRandomId()
    {

        String sql = "SELECT (IF( (select count(courseId) from course) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM course WHERE \"random_number\" NOT IN (SELECT courseId FROM course) LIMIT 1))) as random_number;";
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int save(Course course) {
        StringBuilder sql = new StringBuilder("INSERT INTO course (courseId, userID, title, code, sectionNumber, endDate, settings, isTeamed , semester)");
        sql.append(" VALUES(?,?, ?, ?, ?, ?, ? , ? , ?)");
        int uniqueRandomId = generateUniqueRandomId();
        insert(sql.toString(), uniqueRandomId, course.getUserID(), course.getTitle(),course.getCode(), course.getSectionNumber(),
                course.getEndDate(),course.getSettings(),course.isTeamed(), course.getSemester());
        return uniqueRandomId;
    }

    @Override
    public List<Course> findAll() {
        String sql = "SELECT * FROM course";
        List<Course> course = query(sql, new CourseMapper());
        return  course;
    }

    @Override
    public Course findOne(int courseId) {
        String sql = "SELECT * FROM course WHERE courseID = ?";
        List<Course> course = query(sql, new CourseMapper(), courseId);
        return course.isEmpty() ? null : course.get(0);
    }

    @Override
    public List<Course> findCoursesByUserId(int userId) {
        String sql = "SELECT * FROM course WHERE userID = ?";
        List<Course> course = query(sql, new CourseMapper(), userId);
        return course;
    }

    @Override
    public List<Course> findCoursesByStudent_UserID(int userId) {
        String sql = "SELECT * FROM course_team_student WHERE userID = ?";
        List<Course_Team_Student> course_team_student = query(sql, new Course_Team_Student_Mapper(), userId);
        List<Course> courses = new ArrayList<>();
        for(Course_Team_Student c : course_team_student){
            Course s = findOne(c.getCourseId());
            if (s != null) {
                courses.add(s);
            }
        }

        return courses;
    }


    @Override
    public void update(Course course) {
        StringBuilder sql = new StringBuilder("UPDATE course SET userId = ? SET title = ?, code = ?, sectionNumber = ?, endDate = ?, " +
                "settings = ?, isTeamed = ?, semester = ?  WHERE courseID = ?");
        update(sql.toString(), course.getUserID() , course.getTitle(),course.getCode(), course
                .getSectionNumber() ,course.getEndDate(),course.getSettings(),
                course.isTeamed(), course.getSemester(), course.getCourseID());
    }

    @Override
    public void delete(Course course) {
        String sql = "DELETE FROM course WHERE courseID = ?";
        update(sql, course.getCourseID());


        sql = "DELETE FROM course_team_student where courseID = ?";
        update(sql, course.getCourseID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM course";
        update(sql);
    }


}
