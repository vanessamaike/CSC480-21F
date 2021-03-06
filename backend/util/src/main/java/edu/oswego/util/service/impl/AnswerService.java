package edu.oswego.util.service.impl;


import edu.oswego.util.dao.IAnswerDAO;
import edu.oswego.util.dao.impl.AnswerDAO;
import edu.oswego.util.objects.Answer;
import edu.oswego.util.service.IAnswerService;

import java.util.List;

public class AnswerService implements IAnswerService {

    IAnswerDAO answerDao;
    public AnswerService()
    {
        answerDao = new AnswerDAO();
    }
    @Override
    public Answer save(Answer answer) {
        int id = answerDao.save(answer);
        return answerDao.findOne(id);
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
