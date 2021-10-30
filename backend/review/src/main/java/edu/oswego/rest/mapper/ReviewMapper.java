package edu.oswego.rest.mapper;

import edu.oswego.rest.objects.Review;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

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
                    rs.getBoolean("seen")
            );
            return review;
        }catch(SQLException e)
        {
            return null;
        }
    }
}

