package edu.oswego.util.service.impl;

import edu.oswego.util.dao.IQuestionDAO;
import edu.oswego.util.dao.impl.QuestionDAO;
import edu.oswego.util.objects.Question;
import edu.oswego.util.service.IQuestionService;

import java.util.List;

public class QuestionService implements IQuestionService {

    IQuestionDAO questionDao;
    public QuestionService()
    {
        questionDao = new QuestionDAO();
    }
    @Override
    public Question save(Question question) {
        int id = questionDao.save(question);
        return questionDao.findOne(id);
    }
    @Override
    public List<Question> findAll() {
        return questionDao.findAll();
    }

    @Override
    public Question findOne(int questionId) {
        return questionDao.findOne(questionId);
    }

    @Override
    public Question update(Question question) {
        questionDao.update(question);
        return questionDao.findOne(question.getQuestionID());
    }

    @Override
    public Question delete(Question question) {
        questionDao.delete(question);
        return question;
    }

    @Override
    public void deleteAll() {
        questionDao.deleteAll();
    }
}