package edu.oswego.rest.dao;

import edu.oswego.rest.objects.User;

import java.util.List;

public interface IUserDAO {
    int save(User user);
    List<User> findAll();
    User findOne(int userId);
    void update(User user);
    void delete(User user);
    void deleteAll();
}
