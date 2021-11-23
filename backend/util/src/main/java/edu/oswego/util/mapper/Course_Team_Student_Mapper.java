package edu.oswego.util.mapper;

import edu.oswego.util.objects.Course_Team_Student;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Course_Team_Student_Mapper implements RowMapper<Course_Team_Student> {
    @Override
    public Course_Team_Student mapRow(ResultSet rs) {
        try {
            Course_Team_Student course_team_student = new Course_Team_Student(
                    rs.getInt("userID"),
                    rs.getInt("courseID"),
                    rs.getInt("teamID")
            );
            return course_team_student;
        }catch(SQLException e)
        {
            return null;
        }
    }
}
