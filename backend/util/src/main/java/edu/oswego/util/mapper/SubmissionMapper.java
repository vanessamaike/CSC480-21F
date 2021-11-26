package edu.oswego.util.mapper;

import edu.oswego.util.objects.Submission;

import java.io.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import edu.oswego.util.mapper.RowMapper;

public class SubmissionMapper implements RowMapper<Submission>{
    @Override
    public Submission mapRow(ResultSet rs) {
        try {

            Submission submission = new Submission(
                    rs.getInt("submissionID"),
                    rs.getString("comments"),
                    rs.getObject("submissionTime", LocalDateTime.class),
                    rs.getBytes("pdfDoc"),
                    rs.getString("signOff"),
                    rs.getInt("teamID"),
                    rs.getBoolean("seen"),
                    rs.getString("listOfQCWordViolations"),
                    rs.getInt("assId"),
                    rs.getBoolean("isDeleted")
            );
            return submission;
        }catch(SQLException e)
        {
            return null;
        }
    }

}