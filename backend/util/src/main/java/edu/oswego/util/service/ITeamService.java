package edu.oswego.util.service;

import edu.oswego.util.objects.Team;

public interface ITeamService {
    int save(Team team);
    Team findOne(int teamId);
    void delete(Team team);
}
