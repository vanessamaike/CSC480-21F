package edu.oswego.rest.mapper;

import edu.oswego.rest.objects.Assignment;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AssignmentMapper implements RowMapper<Assignment>{
    @Override
    public Assignment mapRow(ResultSet rs) {
        try {
            Assignment assignment = new Assignment(
                    rs.getInt("assignmentID"),
                    rs.getString("pdfDoc"),
                    rs.getString("settings"),
                    rs.getInt("courseID")
            );
            return assignment;
        }catch(SQLException e)
        {
            return null;
        }
    }

}