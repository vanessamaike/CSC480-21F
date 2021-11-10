package edu.oswego.util.service.impl;



import edu.oswego.util.dao.ISubmissionDAO;
import edu.oswego.util.dao.impl.SubmissionDAO;
import edu.oswego.util.objects.Student;
import edu.oswego.util.objects.Submission;
import edu.oswego.util.service.ISubmissionService;

import java.util.List;

public class SubmissionService implements ISubmissionService {

    ISubmissionDAO submissionDao;
    public SubmissionService()
    {
        submissionDao = new SubmissionDAO();
    }
    @Override
    public Submission save(Submission submission) {
        int id  = submissionDao.save(submission);
        return submissionDao.findOne(id);
    }
    @Override
    public List<Submission> findAll() {
        return submissionDao.findAll();
    }

    @Override
    public List<Submission> findAllByAssId(int assId) {
        return submissionDao.findAllByAssId(assId);
    }

    @Override
    public List<Student> findAllStudents() {
        return submissionDao.findAllStudents();
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