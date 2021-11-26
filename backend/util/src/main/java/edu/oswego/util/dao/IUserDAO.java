package edu.oswego.util.dao;

import edu.oswego.util.objects.User;

import java.util.List;

public interface IUserDAO {
    int save(User user);
    List<User> findAll();
    User findOne(int userId);
    void update(User user);
    void delete(User user);
    void deleteAll();
    int generateUniqueRandomId();
    User findOneWithEmail(String email);
}
