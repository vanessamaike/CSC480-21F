package edu.oswego.util.service;

import edu.oswego.util.objects.Question;

import java.util.List;

public interface IQuestionService {
    Question save(Question question);
    List<Question> findAll();
    Question findOne(int questionId);
    Question update(Question question);
    Question delete(Question question);
    void deleteAll();
}
