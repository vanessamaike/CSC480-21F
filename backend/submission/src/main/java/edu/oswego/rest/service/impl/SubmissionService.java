package edu.oswego.rest.service.impl;



import edu.oswego.rest.dao.ISubmissionDAO;
import edu.oswego.rest.dao.impl.SubmissionDAO;
import edu.oswego.rest.objects.Submission;
import edu.oswego.rest.service.ISubmissionService;

import java.util.List;

public class SubmissionService implements ISubmissionService {

    ISubmissionDAO submissionDao;
    public SubmissionService()
    {
        submissionDao = new SubmissionDAO();
    }
    @Override
    public Submission save(Submission submission) {
        submissionDao.save(submission);
        return submissionDao.findOne(submission.getSubmissionID());
    }
    @Override
    public List<Submission> findAll() {
        return submissionDao.findAll();
    }

    @Override
    public Submission findOne(int submissionId) {
        return submissionDao.findOne(submissionId);
    }

    @Override
    public Submission update(Submission submission) {
        submissionDao.update(submission);
        return submissionDao.findOne(submission.getSubmissionID());
    }

    @Override
    public Submission delete(Submission submission) {
        submissionDao.delete(submission);
        return submission;
    }

    @Override
    public void deleteAll() {
        submissionDao.deleteAll();
    }
}