package edu.oswego.util.service;

import java.util.List;

public interface IObjectService {
    Object save(Object object);
    List<Object> findAll();
    Object findOne(int objectId);
    Object findOne(String objectId);
    Object update(Object object);
    Object delete(Object object);
    void deleteAll();
}
