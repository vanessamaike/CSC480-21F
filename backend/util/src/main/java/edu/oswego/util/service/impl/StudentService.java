package edu.oswego.util.service.impl;


import edu.oswego.util.dao.IStudentDAO;
import edu.oswego.util.dao.impl.StudentDAO;
import edu.oswego.util.objects.Course_Team_Student;
import edu.oswego.util.objects.Student;
import edu.oswego.util.service.IStudentService;

import java.util.List;

public class StudentService implements IStudentService {

    IStudentDAO studentDao;
    public StudentService()
    {
        studentDao = new StudentDAO();
    }

    @Override
    public Student save(Student student) {
        int userId = studentDao.save(student);
        return studentDao.findOne(userId);
    }

    @Override
    public List<Student> findAll() {
        return studentDao.findAll();
    }

    @Override
    public Student findOne(int userId) {
        return studentDao.findOne(userId);
    }

    @Override
    public Student findStudentByStudentId(Student student){
        return studentDao.findStudentByStudentId(student);
    }

    @Override
    public Student update(Student student) {
        studentDao.update(student);
        return studentDao.findOne(student.getUserID());
    }

    @Override
    public Student delete(Student student) {
        studentDao.delete(student);
        return student;
    }

    @Override
    public void deleteAll() {
        studentDao.deleteAll();
    }

    @Override
    public List<Student> findStudentsByTeamID(int teamId) {
        return studentDao.findStudentsByTeamID(teamId);
    }

    @Override
    public List<Student> findStudentsByCourseID(int courseId) {
        return studentDao.findStudentsByCourseID(courseId);
    }

    @Override
    public List<Integer> findDistinctTeamIDsByCourseID(int courseId) {
        return studentDao.findDistinctTeamIDsByCourseID(courseId);
    }

    @Override
    public Integer findDistinctTeamIDByCourseIDAndUserId(int courseId, int userId){
        return studentDao.findDistinctTeamIDByCourseIDAndUserId(courseId, userId);
    }

    @Override
    public int setCourseForStudent(int userId, int courseId){
        return studentDao.setCourseForStudent(userId,courseId);
    }

    @Override
    public int generateUniqueRandomTeamId(){
            return studentDao.generateUniqueRandomTeamId();
    }

    @Override
    public Course_Team_Student setTeamForStudentByUserIdAndCourseId(int userId, int courseId, int teamId) {
        return  studentDao.setTeamForStudentByUserIdAndCourseId(userId,courseId, teamId);
    }
}