package edu.oswego.rest.mapper;

import edu.oswego.rest.objects.Student;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StudentMapper implements RowMapper<Student>{
    @Override
    public Student mapRow(ResultSet rs) {
        try {
            Student student = new Student(
                    rs.getString("studentID"),
                    rs.getInt("userID"),
                    rs.getString("firstName"),
                    rs.getString("lastName"),
                    rs.getString("email"),
                    rs.getInt("teamID"),
                    rs.getFloat("score"),
                    rs.getInt("courseID")
            );
            return student;
        }catch(SQLException e)
        {
            return null;
        }
    }
}

