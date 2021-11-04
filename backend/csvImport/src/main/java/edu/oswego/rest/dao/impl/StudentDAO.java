package edu.oswego.rest.dao.impl;


import edu.oswego.rest.dao.IStudentDAO;
import edu.oswego.rest.mapper.StudentMapper;
import edu.oswego.rest.objects.Student;

import java.util.List;

public class StudentDAO extends AbstractDAO<Student> implements IStudentDAO {
    @Override
    public int generateUniqueRandomId()
    {
<<<<<<< HEAD
        String sql = "SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM student " +
                "WHERE \"random_number\" NOT IN (SELECT userID FROM student) " +
                "LIMIT 1;";
=======

        String sql = "SELECT (IF( (select count(studentId) from student) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM student WHERE \"random_number\" NOT IN (SELECT studentId FROM student) LIMIT 1))) as random_number;";
>>>>>>> 14a9eaa2fab6a0815c51b14b20b216a7e2d13e3d
        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }
    @Override
    public String save(Student student) {
        StringBuilder sql = new StringBuilder("INSERT INTO student (studentId, userId, firstName,lastName,email, teamID,score,courseId) ");
        sql.append(" VALUES(?, ?, ?, ?, ?, ? , ?, ?)");
        int uniqueRandomUserId = generateUniqueRandomId();
        return insertString(sql.toString(), student.getStudentID(), uniqueRandomUserId,student.getFirstName(),
                student.getLastName(), student.getEmail(), student.getTeamID(), student.getScore(),student.getCourseID());
    }

    @Override
    public List<Student> findAll() {
        String sql = "SELECT * FROM student";
        List<Student> student = query(sql, new StudentMapper());
        return student.isEmpty() ? null : student;
    }

    @Override
    public Student findOne(String studentId) {
        String sql = "SELECT * FROM student WHERE studentID = ?";
        List<Student> student = query(sql, new StudentMapper(), studentId);
        return student.isEmpty() ? null : student.get(0);
    }

    @Override
    public void update(Student student) {
        StringBuilder sql = new StringBuilder("UPDATE student SET userId = ?, firstName = ?, lastName = ?, " +
                "email = ? , teamID = ?, score = ?,courseId = ? WHERE studentID = ?");
        update(sql.toString(), student.getUserID(),student.getFirstName() ,student.getLastName(), student.getEmail(), student.getTeamID(), student.getScore(), student.getCourseID(),student.getStudentID());
    }

    @Override
    public void delete(Student student) {
        String sql = "DELETE FROM student WHERE studentID = ?";
        update(sql, student.getStudentID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM student";
        update(sql);
    }


}
