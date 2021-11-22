package edu.oswego.util.mapper;

import edu.oswego.util.objects.Student;
import edu.oswego.util.mapper.RowMapper;
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
                    rs.getString("email")
            );
            return student;
        }catch(SQLException e)
        {
            return null;
        }
    }
}

