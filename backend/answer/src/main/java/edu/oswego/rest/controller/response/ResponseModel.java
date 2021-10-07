package edu.oswego.rest.controller.response;

import javax.ws.rs.core.Response;

public class ResponseModel implements IResponse{
    private String message;
    private Object result;



    private int statusCode;

    public ResponseModel(String message, int statusCode, Object result) {
        this.message = message;
        this.statusCode = statusCode;
        this.result = result;
    }

    public ResponseModel() {
        this.message = "";
        this.statusCode = 0;
        this.result = new Object();
    }

    public ResponseModel response_Status_OK(Object result)
    {
        return new ResponseModel("successfull", Response.Status.OK.getStatusCode() , result);
    }

    public ResponseModel response_Status_Bad_Request(Object result)
    {
        return null;
    }
    public ResponseModel response_Status_Unauthorized(Object result){
        return null;
    }
    public ResponseModel response_Status_Not_Found(Object result){
        return null;
    }
    public ResponseModel response_Status_Method_Not_Allowed(Object result){
        return null;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}
