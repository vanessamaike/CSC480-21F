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
import java.util.Objects;

public class authObject {


    private static final String CLIENT_ID = "51547256571-4hgvg5mtjrdit2bnaft8k2b5j44e6l3b.apps.googleusercontent.com";



    String returnRole(JwtToken myJWT) {

        String role = "";
        try {
            role = authUser(myJWT);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return role;
    }


    @Consumes(MediaType.APPLICATION_JSON)
    public String authUser(JwtToken token) throws Exception {

        User userPopulated = new User();
        String role = "NotAuthenticated";

        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID)).build();

        GoogleIdToken idToken = verifier.verify(token.compact());

        if (idToken != null) {

            GoogleIdToken.Payload payload = idToken.getPayload();
            userPopulated = checkIfUserIsInDatabaseAndReturnRole(payload.getEmail());

            if (Objects.isNull(userPopulated)) {
                System.out.println("Hey! This user is not authenticated. Deny permissions!");
            } else {
                role = userPopulated.getRole();
            }

        }

        return role;
    }


    public User checkIfUserIsInDatabaseAndReturnRole(String email) {

        UserService userService = new UserService();
        return userService.findOneWithEmail(email);

    }







}