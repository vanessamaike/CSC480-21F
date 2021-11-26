package edu.oswego.util.dao.impl;

import edu.oswego.util.dao.ITeamDAO;

import edu.oswego.util.mapper.TeamMapper;
import edu.oswego.util.mapper.UserMapper;
import edu.oswego.util.objects.Team;
import edu.oswego.util.objects.User;

import java.util.List;


public class TeamDAO extends AbstractDAO<Team> implements ITeamDAO {
    @Override
    public int save(Team team) {
        StringBuilder sql = new StringBuilder("INSERT INTO team (teamId, teamName)");
        sql.append(" VALUES(?, ?)");
        insert(sql.toString(), team.getTeamID(), team.getTeamName());
        return team.getTeamID();
    }

    @Override
    public Team findOne(int teamId) {
        String sql = "SELECT * FROM team WHERE teamID = ?";
        List<Team> teams = query(sql, new TeamMapper(), teamId);
        return teams.isEmpty() ? null : teams.get(0);
    }

    @Override
    public void delete(Team team) {
        String sql = "DELETE FROM user WHERE teamID = ?";
        update(sql, team.getTeamID());
    }
}
