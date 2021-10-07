package edu.oswego.rest.service;

import edu.oswego.rest.objects.User;

import java.util.List;

public interface IUserService {
    User save(User user);
    List<User> findAll();
    User findOne(int userId);
    User update(User user);
    User delete(User user);
    void deleteAll();
}
