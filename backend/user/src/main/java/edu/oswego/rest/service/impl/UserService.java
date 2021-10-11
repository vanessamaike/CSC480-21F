package edu.oswego.rest.service.impl;


import edu.oswego.rest.dao.IUserDAO;
import edu.oswego.rest.dao.impl.UserDAO;
import edu.oswego.rest.objects.User;
import edu.oswego.rest.service.IUserService;

import java.util.List;

public class UserService implements IUserService {

    IUserDAO userDao;
    public UserService()
    {
        userDao = new UserDAO();
    }
    @Override
    public User save(User user) {
        userDao.save(user);
        return userDao.findOne(user.getUserID());
    }
    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User findOne(int userId) {
        return userDao.findOne(userId);
    }

    @Override
    public User update(User user) {
        userDao.update(user);
        return userDao.findOne(user.getUserID());
    }

    @Override
    public User delete(User user) {
        userDao.delete(user);
        return user;
    }

    @Override
    public void deleteAll() {
        userDao.deleteAll();
    }
}

