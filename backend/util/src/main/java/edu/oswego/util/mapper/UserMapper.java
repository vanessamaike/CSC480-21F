package edu.oswego.util.mapper;

import edu.oswego.util.objects.User;
import edu.oswego.util.mapper.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User>{
    @Override
    public User mapRow(ResultSet rs) {
        try {
            User user = new User(
                    rs.getInt("userID"),
                    rs.getString("email"),
                    rs.getString("role"),
                    rs.getString("settings")
            );
            return user;
        }catch(SQLException e)
        {
            return null;
        }
    }
}