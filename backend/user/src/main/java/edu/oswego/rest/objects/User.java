package edu.oswego.rest.objects;

public class User {
    private int userID;
    private String email;
    private String role;
    private String settings;

    public User(int userID, String email,String role,String settings){
        this.userID = userID;
        this.email = email;
        this.role = role;
        this.settings = settings;
    }

    public User(){
        this.userID = 1;
        this.email = "";
        this.role = "";
        this.settings = "";
    }

    public int getUserID() {
        return userID;
    }

    public String getEmail() {
        return email;
    }


    public String getRole() {
        return role;
    }

    public String getSettings() {
        return settings;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }
}
