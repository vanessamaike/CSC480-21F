package edu.oswego.rest.mapper;

import edu.oswego.rest.objects.Course;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class CourseMapper implements RowMapper<Course>{
    @Override
    public Course mapRow(ResultSet rs) {
        try {
            Course course = new Course(
                    rs.getInt("courseID"),
                    rs.getString("title"),
                    rs.getString("code"),
                    rs.getObject("endDate", LocalDate.class),
                    rs.getString("settings")
            );
            return course;
        }catch(SQLException e)
        {
            return null;
        }
    }
}

