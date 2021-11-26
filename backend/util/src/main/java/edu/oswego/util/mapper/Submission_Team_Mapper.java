package edu.oswego.util.mapper;

import edu.oswego.util.objects.Submission_Team;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Submission_Team_Mapper implements RowMapper<Submission_Team> {
    @Override
    public Submission_Team mapRow(ResultSet rs) {
        try {
            return new Submission_Team(
                    rs.getInt("submissionId"),
                    rs.getInt("teamID"),
                    rs.getInt("assignmentID")
            );
        }catch(SQLException e)
        {
            return null;
        }
    }
}
