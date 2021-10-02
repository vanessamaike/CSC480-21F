package edu.oswego.rest.dao;

import edu.oswego.rest.objects.Question;

import java.util.List;

public interface IQuestionDAO {
    int save(Question question);
    List<Question> findAll();
    Question findOne(int questionId);
    void update(Question question);
    void delete(Question question);
    void deleteAll();
}
