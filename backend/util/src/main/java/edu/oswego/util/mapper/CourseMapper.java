package edu.oswego.util.mapper;

import edu.oswego.util.objects.Course;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import edu.oswego.util.mapper.RowMapper;
public class CourseMapper implements RowMapper<Course>{
    @Override
    public Course mapRow(ResultSet rs) {
        try {
            Course course = new Course(
                    rs.getInt("courseID"),
                    rs.getInt("userID"),
                    rs.getString("title"),
                    rs.getString("code"),
                    rs.getString("sectionNumber"),
                    rs.getObject("endDate", LocalDate.class),
                    rs.getString("settings"),
                    rs.getBoolean("isTeamed"),
                    rs.getString("semester")
            );
            return course;
        }catch(SQLException e)
        {
            return null;
        }
    }
}

