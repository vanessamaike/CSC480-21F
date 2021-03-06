package edu.oswego.util.service;

import edu.oswego.util.objects.Answer;

import java.util.List;

public interface IAnswerService  {
    Answer save(Answer answer);
    List<Answer> findAll();
    Answer findOne(int answerId);
    Answer update(Answer answer);
    Answer delete(Answer answer);
    void deleteAll();
}
