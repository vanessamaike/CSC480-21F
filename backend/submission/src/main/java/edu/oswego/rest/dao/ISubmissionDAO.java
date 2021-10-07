package edu.oswego.rest.dao;

import edu.oswego.rest.objects.Submission;

import java.util.List;

public interface ISubmissionDAO {
    int save(Submission submission);
    List<Submission> findAll();
    Submission findOne(int submissionId);
    void update(Submission submission);
    void delete(Submission submission);
    void deleteAll();

}