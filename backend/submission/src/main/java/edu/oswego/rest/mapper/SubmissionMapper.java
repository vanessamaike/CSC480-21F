package edu.oswego.rest.mapper;

import edu.oswego.rest.objects.Assignment;
import edu.oswego.rest.objects.Submission;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SubmissionMapper implements RowMapper<Submission>{
    @Override
    public Submission mapRow(ResultSet rs) {
        try {
            Submission submission = new Submission(
                    rs.getInt("submissionID"),
                    rs.getString("pdfDoc"),
                    rs.getString("signOff"),
                    rs.getInt("teamID")
            );
            return submission;
        }catch(SQLException e)
        {
            return null;
        }
    }

}