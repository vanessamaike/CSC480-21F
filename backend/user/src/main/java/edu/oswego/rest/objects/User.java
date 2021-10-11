package edu.oswego.rest.objects;

public class User {
    private int userID;
    private String email;
    private String role;

    public User(int userID, String email,String role){
        this.userID = userID;
        this.email = email;
        this.role = role;
    }

    public User(){
        this.userID = 1;
        this.email = "";
        this.role = "";
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

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
