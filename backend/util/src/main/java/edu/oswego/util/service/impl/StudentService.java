package edu.oswego.util.service.impl;


import edu.oswego.util.dao.IStudentDAO;
import edu.oswego.util.dao.impl.StudentDAO;
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
        studentDao.save(student);
        return studentDao.findOne(student.getStudentID());
    }
    @Override
    public List<Student> findAll() {
        return studentDao.findAll();
    }

    @Override
    public Student findOne(String studentId) {
        return studentDao.findOne(studentId);
    }

    @Override
    public Student update(Student student) {
        studentDao.update(student);
        return studentDao.findOne(student.getStudentID());
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
    public Student findUserID(int userId) {
        return studentDao.findUserID(userId);
    }

    @Override
    public Student findTeamID(int id) {
        return studentDao.findTeamID(id);
    }
}