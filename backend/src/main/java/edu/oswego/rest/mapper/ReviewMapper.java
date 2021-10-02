package edu.oswego.rest.mapper;

import edu.oswego.rest.objects.Review;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper implements RowMapper<Review>{
    @Override
    public Review mapRow(ResultSet rs) {
        try {
            Review review = new Review(
                    rs.getInt("reviewID"),
                    rs.getString("pdfDoc"),
                    rs.getString("signOff"),
                    rs.getInt("teamID")
            );
            return review;
        }catch(SQLException e)
        {
            return null;
        }
    }
}

