package edu.oswego.rest.service;

import edu.oswego.rest.objects.Submission;

import java.util.List;

public interface ISubmissionService {
    Submission save(Submission submission);
    List<Submission> findAll();
    Submission findOne(int submissionId);
    Submission update(Submission submission);
    Submission delete(Submission submission);
    void deleteAll();
}
