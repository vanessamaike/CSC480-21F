package edu.oswego.util.dao.impl;

import edu.oswego.util.dao.ISubTeamDAO;
import edu.oswego.util.mapper.Submission_Team_Mapper;
import edu.oswego.util.objects.Submission_Team;

import java.util.List;

public class SubTeamDAO extends AbstractDAO<Submission_Team> implements ISubTeamDAO {

    @Override
    public void save(Submission_Team subTeam) {
        StringBuilder sql = new StringBuilder("INSERT INTO submission_team (submissionId, teamID, assignmentId)");
        sql.append(" VALUES(?, ?, ? )");
        insert(sql.toString(), subTeam.getSubmissionId(), subTeam.getTeamId(), subTeam.getAssignmentId());
    }

    @Override
    public List<Submission_Team> findAll(int sID) {
        String sql = "SELECT * FROM submission_team WHERE submissionId = ?";
        List<Submission_Team> subTeams = query(sql, new Submission_Team_Mapper(), sID);
        return subTeams;
    }

    @Override
    public List<Submission_Team> findByTeamIdAndAssignmentId(int tID, int aID) {
        String sql = "SELECT * FROM submission_team WHERE teamId = ? and assignmentID = ?";
        List<Submission_Team> stds = query(sql, new Submission_Team_Mapper(), tID, aID);
        return stds.isEmpty() ? null : stds;
    }

    @Override
    public List<Submission_Team> findBySubmissionIdAndAssignmentId(int sID, int aID) {
        String sql = "SELECT * FROM submission_team WHERE submissionId = ? and assignmentID = ?";
        List<Submission_Team> stds = query(sql, new Submission_Team_Mapper(), sID, aID);
        return stds.isEmpty() ? null : stds;
    }

    @Override
    public void update(Submission_Team subTeam) {
        //TODO I think this is going to overwrite existing entries.
        //I'm not convinced we even need this method.
        StringBuilder sql = new StringBuilder("UPDATE submission_team SET submissionId = ? SET teamId = ? WHERE submissionId = ?");
        update(sql.toString(), subTeam.getSubmissionId(), subTeam.getTeamId(), subTeam.getSubmissionId());
    }

    @Override
    public void delete(Submission_Team subTeam) {
        String sql = "DELETE FROM submission_team WHERE submissionId = ? AND WHERE teamId = ?";
        update(sql, subTeam.getSubmissionId(), subTeam.getTeamId());
    }

}
