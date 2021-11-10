package edu.oswego.util.service;

import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.Submission;

import java.util.List;

public interface ISubmissionService {
    Submission save(Submission submission);
    List<Submission> findAll();
    List<Submission> findAllByAssId(int assId);
    List<Student> findAllStudents();
    Submission findOne(int submissionId);
    Submission update(Submission submission);
    Submission delete(Submission submission);
    void deleteAll();
}
