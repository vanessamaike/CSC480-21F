package edu.oswego.rest.service;

import edu.oswego.rest.objects.Student;

import java.util.List;

public interface IStudentService{
    Student save(Student student);
    List<Student> findAll();
    Student findOne(String studentId);
    Student update(Student student);
    Student delete(Student student);
    void deleteAll();
}
