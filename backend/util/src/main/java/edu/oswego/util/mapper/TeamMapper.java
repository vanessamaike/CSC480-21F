package edu.oswego.util.mapper;

import edu.oswego.util.objects.Team;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TeamMapper implements RowMapper<Team> {
    @Override
    public Team mapRow(ResultSet rs) {
        try {
            Team user = new Team(
                    rs.getInt("teamID"),
                    rs.getInt("teamName")
            );
            return user;
        } catch (SQLException e) {
            return null;
        }
    }
}