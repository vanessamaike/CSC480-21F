package edu.oswego.util.objects;

//import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import edu.oswego.util.service.impl.UserService;
import edu.oswego.util.utility.ConfigReader;
//import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class authObject {


    private final ConfigReader read = new ConfigReader();

    public User getUser() {
        return user;
    }

    private User user ;
//    @Inject
//    @ConfigProperty(name = "edu.oswego.util.objects.authObject.CLIENT_ID")
    String CLIENT_ID = read.getValueAsString("edu.oswego.util.objects.authObject.CLIENT_ID");

    public boolean isAuthenticated(String myJWT, List<String> roles) {

        String roleCheck = "";
        try {
            roleCheck = authUser(myJWT);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(roleCheck.equals("") || roleCheck.equals("NotAuthenticated"))
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
            return idx > 0;
        }
    }




    @Consumes(MediaType.APPLICATION_JSON)
    public String authUser(String token) {

        User userPopulated = new User();
        String role = "NotAuthenticated";

        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID)).build();

        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(token);
        } catch (Exception ignored) {
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