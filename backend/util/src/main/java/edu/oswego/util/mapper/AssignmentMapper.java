package edu.oswego.util.mapper;

import edu.oswego.util.objects.Assignment;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import edu.oswego.util.mapper.RowMapper;
public class AssignmentMapper implements RowMapper<Assignment>{
    @Override
    public Assignment mapRow(ResultSet rs) {
        try {
            Assignment assignment = new Assignment(
                    rs.getInt("assignmentID"),
                    rs.getString("title"),
                    rs.getBoolean("isTeamed"),
                    rs.getBoolean("reviewStage"),
                    rs.getInt("courseID"),
                    rs.getBytes("solutionPdfDoc"),
                    rs.getBytes("peerReviewPdfDoc"),
                    rs.getString("settings"),
                    rs.getBoolean("isDraft"),
                    rs.getObject("publishDateTime", LocalDateTime.class),
                    rs.getObject("solutionDueDateTime", LocalDateTime.class),
                    rs.getObject("peerReviewDueDateTime", LocalDateTime.class)
            );
            return assignment;
        }catch(SQLException e)
        {
            return null;
        }
    }

}