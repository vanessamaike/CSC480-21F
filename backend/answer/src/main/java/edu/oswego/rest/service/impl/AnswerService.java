package edu.oswego.rest.service.impl;


import edu.oswego.rest.dao.IAnswerDAO;
import edu.oswego.rest.dao.impl.AnswerDAO;
import edu.oswego.rest.objects.Answer;
import edu.oswego.rest.service.IAnswerService;

import java.util.List;

public class AnswerService implements IAnswerService {

    IAnswerDAO answerDao;
    public AnswerService()
    {
        answerDao = new AnswerDAO();
    }
    @Override
    public Answer save(Answer answer) {
        answerDao.save(answer);
        return answerDao.findOne(answer.getAnswerID());
    }
    @Override
    public List<Answer> findAll() {
        return answerDao.findAll();
    }

    @Override
    public Answer findOne(int answerId) {
        return answerDao.findOne(answerId);
    }

    @Override
    public Answer update(Answer answer) {
        answerDao.update(answer);
        return answerDao.findOne(answer.getAnswerID());
    }

    @Override
    public Answer delete(Answer answer) {
        answerDao.delete(answer);
        return answer;
    }

    @Override
    public void deleteAll() {
        answerDao.deleteAll();
    }
}
