package edu.oswego.rest.service.impl;


import edu.oswego.rest.dao.IStudentDAO;
import edu.oswego.rest.dao.impl.StudentDAO;
import edu.oswego.rest.objects.Student;
import edu.oswego.rest.service.IStudentService;

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
}