package edu.oswego.util.objects;

public class Team {

    private int teamID ;
    private int teamName ;

    public Team(int teamID, int teamName) {
        this.teamID = teamID;
        this.teamName = teamName;
    }

    public Team() {
        this.teamID = -1;
        this.teamName = -1;
    }

    public int getTeamID() {
        return teamID;
    }

    public void setTeamID(int teamID) {
        this.teamID = teamID;
    }

    public int getTeamName() {
        return teamName;
    }

    public void setTeamName(int teamName) {
        this.teamName = teamName;
    }
}
