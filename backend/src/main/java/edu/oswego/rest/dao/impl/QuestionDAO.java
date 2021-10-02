package edu.oswego.rest.dao.impl;

import edu.oswego.rest.dao.IQuestionDAO;
import edu.oswego.rest.mapper.QuestionMapper;
import edu.oswego.rest.objects.Question;

import java.util.List;

public class QuestionDAO extends AbstractDAO<Question> implements IQuestionDAO {

    @Override
    public int save(Question question) {
        StringBuilder sql = new StringBuilder("INSERT INTO question (questionId, question, assignmentId, value )");
        sql.append(" VALUES(?, ?, ?, ?)");
        return insert(sql.toString(), question.getQuestionID(), question.getQuestion(),question.getAssignmentID(),
                question.getValue());
    }

    @Override
    public List<Question> findAll() {
        String sql = "SELECT * FROM question";
        List<Question> question = query(sql, new QuestionMapper());
        return question.isEmpty() ? null : question;
    }

    @Override
    public Question findOne(int questionId) {
        String sql = "SELECT * FROM question WHERE questionID = ?";
        List<Question> question = query(sql, new QuestionMapper(), questionId);
        return question.isEmpty() ? null : question.get(0);
    }

    @Override
    public void update(Question question) {
        StringBuilder sql = new StringBuilder("UPDATE question SET question = ?, assignmentId = ?, value = ? WHERE questionID = ?");
        update(sql.toString(), question.getQuestion(),question.getAssignmentID() ,question.getValue());
    }

    @Override
    public void delete(Question question) {
        String sql = "DELETE FROM question WHERE questionID = ?";
        update(sql, question.getQuestionID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM question";
        update(sql);
    }


}

