package edu.oswego.rest.mapper;

import edu.oswego.rest.objects.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User>{
    @Override
    public User mapRow(ResultSet rs) {
        try {
            User user = new User(
                    rs.getInt("userID"),
                    rs.getString("email"),
                    rs.getString("role")
            );
            return user;
        }catch(SQLException e)
        {
            return null;
        }
    }
}