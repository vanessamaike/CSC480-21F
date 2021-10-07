package edu.oswego.rest.service;

import edu.oswego.rest.objects.Answer;

import java.util.List;

public interface IAnswerService  {
    Answer save(Answer answer);
    List<Answer> findAll();
    Answer findOne(int answerId);
    Answer update(Answer answer);
    Answer delete(Answer answer);
    void deleteAll();
}
