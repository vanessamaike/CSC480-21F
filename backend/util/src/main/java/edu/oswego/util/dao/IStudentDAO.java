package edu.oswego.util.dao;

import edu.oswego.util.objects.Course_Team_Student;
import edu.oswego.util.objects.Student;

import java.util.List;

public interface IStudentDAO {
    int save(Student student);
    List<Student> findAll();
    Student findOne(int userID);
    void update(Student student);
    void delete(Student student);
    void deleteAll();
    List<Student> findStudentsByTeamID(int teamId);
    List<Student> findStudentsByCourseID(int courseId);
    List<Integer> findDistinctTeamIDsByCourseID(int courseId);
    int setCourseForStudent(int userId, int courseId);
    int generateUniqueRandomTeamId();
    Course_Team_Student setTeamForStudentByUserIdAndCourseId(int userId, int courseId, int teamId);

}
