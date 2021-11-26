package edu.oswego.util.dao;


import edu.oswego.util.objects.Team;

public interface ITeamDAO {
    int save(Team team);
    Team findOne(int teamId);
    void delete(Team team);
}
