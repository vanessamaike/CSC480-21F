package edu.oswego.util.objects;

import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import com.ibm.websphere.security.jwt.JwtToken;
import edu.oswego.util.service.impl.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class authObject {

    public User getUser() {
        return user;
    }

    private User user ;
    private static final String CLIENT_ID = "637717333332-2fauonnc42evp1f3qfi7e4br0okm5cu8.apps.googleusercontent.com";

    public boolean isAuthenticated(String myJWT, List<String> roles) {

        String roleCheck = "";
        try {
            roleCheck = authUser(myJWT);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(roleCheck == "" || roleCheck == "NotAuthenticated")
        {
            return false;
        }
        else {
            int idx = 0;
            for (String role : roles){
                if (role.contains(roleCheck)){
                    idx++;
                }
            }
            if(idx > 0)
            {
                return true;
            }
            else{
                return false;
            }
        }
    }




    @Consumes(MediaType.APPLICATION_JSON)
    public String authUser(String token) throws Exception {

        User userPopulated = new User();
        String role = "NotAuthenticated";

        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID)).build();

        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(token);
        } catch (Exception e) {
            idToken = null;
        }


        if (idToken != null) {

            GoogleIdToken.Payload payload = idToken.getPayload();
            userPopulated = checkIfUserIsInDatabaseAndReturnRole(payload.getEmail());

            if (Objects.isNull(userPopulated)) {
                System.out.println("Hey! This user is not authenticated. Deny permissions!");
            } else {
                role = userPopulated.getRole();
                user = userPopulated;
            }

        }

        return role;
    }

    public User checkIfUserIsInDatabaseAndReturnRole(String email) {

        UserService userService = new UserService();
        return userService.findOneWithEmail(email);
    }

}