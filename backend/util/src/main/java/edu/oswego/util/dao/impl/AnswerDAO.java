package edu.oswego.util.dao.impl;


import edu.oswego.util.dao.IAnswerDAO;
import edu.oswego.util.mapper.AnswerMapper;
import edu.oswego.util.objects.Answer;
import edu.oswego.util.dao.impl.AbstractDAO;
import java.util.List;

public class AnswerDAO extends AbstractDAO<Answer> implements IAnswerDAO {

    @Override
    public int generateUniqueRandomId()
    {
        String sql = "SELECT (IF( (select count(answerId) from answer) = 0," +
                "(SELECT FLOOR(10000 + RAND() * 89999))," +
                "(SELECT FLOOR(10000 + RAND() * 89999) AS random_number " +
                "FROM answer WHERE \"random_number\" NOT IN (SELECT answerId FROM answer) LIMIT 1))) as random_number;";

        List<Integer> generatedUniqueRandomId = generateUniqueRandomId(sql);
        return generatedUniqueRandomId.isEmpty() ? null : generatedUniqueRandomId.get(0);
    }

    @Override
    public int save(Answer answer) {
        StringBuilder sql = new StringBuilder("INSERT INTO answer (answerId, submissionId, questionId, score,possible ,answer )");
        sql.append(" VALUES(?, ?, ?, ?, ? , ?)");
        int uniqueRandomId = generateUniqueRandomId();
        insert(sql.toString(), uniqueRandomId, answer.getSubmissionID(),answer.getQuestionID(),
                answer.getScore(),answer.getPossible(), answer.getAnswer());
        return uniqueRandomId;
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
                "possible = ?, answer = ? WHERE answerID = ?");
        update(sql.toString(), answer.getSubmissionID(),answer.getQuestionID() ,answer.getScore(),answer.getPossible(), answer.getAnswer(), answer.getAnswerID());
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
