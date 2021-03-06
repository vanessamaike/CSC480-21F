package edu.oswego.util.dao;

import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.Submission;

import java.util.List;

public interface ISubmissionDAO {
    int save(Submission submission);
    List<Submission> findAll();
    List<Student> findAllStudents();
    Submission findOne(int submissionId);
    Submission findTheLatestSubmissionByAssignmentIdAndTeamId(int assignmentId, int teamId);
    List<Submission> findSubmissionsByAssignmentIdAndTeamId(int assignmentId, int teamId);
    void update(Submission submission);
    void delete(Submission submission);
    void deleteAll();
    int generateUniqueRandomId();

    List<Submission> findAllByAssId(int assId);
}