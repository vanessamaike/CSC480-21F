package edu.oswego.util.dao;

import edu.oswego.util.mapper.RowMapper;

import java.util.List;

public interface GenericDAO<T> {
    <T> List<T> query(String sql, RowMapper<T> rowMapper, Object... parameters);
    void update (String sql, Object... parameters);
    int insert (String sql, Object... parameters);
    String insertString (String sql, Object... parameters);
    int count(String sql, Object... parameters);
    List<Integer> generateUniqueRandomId(String sql, Object... parameters);
    List<Integer> queryInteger(String sql, String fieldName,Object... parameters);
}
