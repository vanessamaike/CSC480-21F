package edu.oswego.rest.controller.response;

public interface IResponse {
    ResponseModel response_Status_OK(Object result);
    ResponseModel response_Status_Bad_Request(Object result);
    ResponseModel response_Status_Unauthorized(Object result);
    ResponseModel response_Status_Not_Found(Object result);
    ResponseModel response_Status_Method_Not_Allowed(Object result);
}
