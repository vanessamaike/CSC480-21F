package edu.oswego.util.mapper;

import edu.oswego.util.objects.Review;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import edu.oswego.util.mapper.RowMapper;
public class ReviewMapper implements RowMapper<Review>{
    @Override
    public Review mapRow(ResultSet rs) {
        try {
            Review review = new Review(
                    rs.getInt("reviewID"),
                    rs.getString("comments"),
                    rs.getObject("submissionTime", LocalDateTime.class),
                    rs.getBytes("pdfDoc"),
                    rs.getString("signOff"),
                    rs.getInt("teamID"),
                    rs.getBoolean("seen"),
                    rs.getInt("assId"),
                    rs.getInt("submissionID"),
                    rs.getString("listOfQCWordViolations"),
                    rs.getBoolean("SDCheck"),
                    rs.getFloat("score")
            );
            return review;
        }catch(SQLException e)
        {
            return null;
        }
    }
}

