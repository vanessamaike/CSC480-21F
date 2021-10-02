package edu.oswego.rest.dao.impl;


import edu.oswego.rest.dao.IAnswerDAO;
import edu.oswego.rest.mapper.AnswerMapper;
import edu.oswego.rest.objects.Answer;

import java.util.List;

public class AnswerDAO extends AbstractDAO<Answer> implements IAnswerDAO {

    @Override
    public int save(Answer answer) {
        StringBuilder sql = new StringBuilder("INSERT INTO answer (answerId, submissionId, questionId, score,possible ,answer )");
        sql.append(" VALUES(?, ?, ?, ?, ? , ?)");
        return insert(sql.toString(), answer.getAnswerID(), answer.getSubmissionID(),answer.getQuestionID(),
                answer.getScore(),answer.getPossible(), answer.getAnswer());
    }

    @Override
    public List<Answer> findAll() {
        String sql = "SELECT * FROM answer";
        List<Answer> answer = query(sql, new AnswerMapper());
        return answer.isEmpty() ? null : answer;
    }

    @Override
    public Answer findOne(int answerId) {
        String sql = "SELECT * FROM answer WHERE answerID = ?";
        List<Answer> answer = query(sql, new AnswerMapper(), answerId);
        return answer.isEmpty() ? null : answer.get(0);
    }

    @Override
    public void update(Answer answer) {
        StringBuilder sql = new StringBuilder("UPDATE answer SET submissionId = ?, questionId = ?, score = ?, " +
                "possible = ?, answer = ?, WHERE answerID = ?");
        update(sql.toString(), answer.getSubmissionID(),answer.getQuestionID() ,answer.getScore(),answer.getPossible(), answer.getAnswer());
    }

    @Override
    public void delete(Answer answer) {
        String sql = "DELETE FROM answer WHERE answerID = ?";
        update(sql, answer.getAnswerID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM answer";
        update(sql);
    }


}
