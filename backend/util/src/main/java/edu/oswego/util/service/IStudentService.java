package edu.oswego.util.service;

import edu.oswego.util.objects.Course_Team_Student;
import edu.oswego.util.objects.Student;

import java.util.List;

public interface IStudentService{
    Student save(Student student);
    List<Student> findAll();
    Student findOne(int userId);
    Student findStudentByStudentId(Student student);
    Student update(Student student);
    Student delete(Student student);
    void deleteAll();
    List<Student> findStudentsByTeamID(int teamId);
    List<Student> findStudentsByCourseID(int courseId);
    List<Integer> findDistinctTeamIDsByCourseID(int courseId);
    Integer findDistinctTeamIDByCourseIDAndUserId(int courseId, int userId);
    int setCourseForStudent(int userId, int courseId);
    int generateUniqueRandomTeamId();
    Course_Team_Student setTeamForStudentByUserIdAndCourseId(int userId, int courseId, int teamId);
}
