package edu.oswego.rest.dao.impl;



import edu.oswego.rest.dao.IUserDAO;
import edu.oswego.rest.mapper.UserMapper;
import edu.oswego.rest.objects.User;

import java.util.List;

public class UserDAO extends AbstractDAO<User> implements IUserDAO {

    @Override
    public int save(User user) {
        StringBuilder sql = new StringBuilder("INSERT INTO user (userId, email, role)");
        sql.append(" VALUES(?, ?, ?)");
        return insert(sql.toString(), user.getUserID(), user.getEmail(),user.getRole());
    }

    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM user";
        List<User> user = query(sql, new UserMapper());
        return user.isEmpty() ? null : user;
    }

    @Override
    public User findOne(int userId) {
        String sql = "SELECT * FROM user WHERE userID = ?";
        List<User> user = query(sql, new UserMapper(), userId);
        return user.isEmpty() ? null : user.get(0);
    }

    @Override
    public void update(User user) {
        StringBuilder sql = new StringBuilder("UPDATE user SET email = ?, role = ? WHERE userID = ?");
        update(sql.toString(), user.getEmail(),user.getRole());
    }

    @Override
    public void delete(User user) {
        String sql = "DELETE FROM user WHERE userID = ?";
        update(sql, user.getUserID());
    }

    @Override
    public void deleteAll() {
        String sql = "DELETE FROM user";
        update(sql);
    }


}