package edu.oswego.util.mapper;

import edu.oswego.util.objects.Question;
import edu.oswego.util.mapper.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class QuestionMapper implements RowMapper<Question>{
    @Override
    public Question mapRow(ResultSet rs) {
        try {
            Question question = new Question(
                    rs.getInt("questionID"),
                    rs.getInt("assignmentID"),
                    rs.getString("question"),
                    rs.getInt("value")
            );
            return question;
        }catch(SQLException e)
        {
            return null;
        }
    }
}

