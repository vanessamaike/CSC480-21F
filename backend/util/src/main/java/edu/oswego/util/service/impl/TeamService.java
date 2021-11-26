package edu.oswego.util.service.impl;


import edu.oswego.util.dao.ITeamDAO;
import edu.oswego.util.dao.IUserDAO;
import edu.oswego.util.dao.impl.TeamDAO;
import edu.oswego.util.dao.impl.UserDAO;
import edu.oswego.util.objects.Team;
import edu.oswego.util.service.ITeamService;

public class TeamService  implements ITeamService {

    ITeamDAO teamDao;
    public TeamService()
    {
        teamDao = new TeamDAO();
    }

    @Override
    public int save(Team team) {
        return teamDao.save(team);
    }

    @Override
    public Team findOne(int teamId) {
        return teamDao.findOne(teamId);
    }

    @Override
    public void delete(Team team) {
        teamDao.delete(team);
    }
}
