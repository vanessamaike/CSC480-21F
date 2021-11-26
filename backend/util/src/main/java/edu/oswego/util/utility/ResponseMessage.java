package edu.oswego.util.utility;

import javax.ws.rs.core.Response;

public class ResponseMessage {
    public Response sendMessage(String message, int statusCode){
        return Response
                .status(statusCode)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization") //
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(message)
                .build();
    }
}
