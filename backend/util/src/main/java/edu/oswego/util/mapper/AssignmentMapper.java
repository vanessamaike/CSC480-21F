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
                    rs.getBytes("pdfDoc"),
                    rs.getString("settings"),
                    rs.getInt("courseID"),
                    rs.getString("title"),
                    rs.getBoolean("isTeamed"),
                    rs.getBoolean("reviewStage"),
                    rs.getObject("dueDateTime", LocalDateTime.class),
                    rs.getObject("reviewDateTime", LocalDateTime.class)
            );
            return assignment;
        }catch(SQLException e)
        {
            return null;
        }
    }

}