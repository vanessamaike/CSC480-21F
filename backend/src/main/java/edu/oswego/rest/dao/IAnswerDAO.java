package edu.oswego.rest.dao;

import edu.oswego.rest.objects.Answer;

import java.util.List;

public interface IAnswerDAO {
    int save(Answer answer);
    List<Answer> findAll();
    Answer findOne(int answerId);
    void update(Answer answer);
    void delete(Answer answer);
    void deleteAll();

}
