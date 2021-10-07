package edu.oswego.rest.hello;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/resource")
public class RestResource {

    @GET
    public String getRequest(){ return "Hello world!"; }
}
