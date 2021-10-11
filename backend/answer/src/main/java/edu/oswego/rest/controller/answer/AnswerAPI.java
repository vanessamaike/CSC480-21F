package edu.oswego.rest.controller.answer;

import com.fasterxml.jackson.core.JsonProcessingException;
import edu.oswego.rest.controller.response.IResponse;
import edu.oswego.rest.controller.response.ResponseModel;
import edu.oswego.rest.objects.Answer;
import edu.oswego.rest.service.IAnswerService;
import edu.oswego.rest.service.impl.AnswerService;

// Json-B
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

// JAX-RS
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("/answer")
public class AnswerAPI {
    private static final long serialVersionUID = 1L;
    private IAnswerService answerService;
    private IResponse response;
    private Jsonb jsonb = JsonbBuilder.create();
    public AnswerAPI() {
        answerService = new AnswerService();
        response = new ResponseModel();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAnswers(){

        List<Answer> listOfAnswers = answerService.findAll();
        //ResponseModel res = response.response_Status_OK(listOfAnswers);
        String listOfAnswers_json = jsonb.toJson(listOfAnswers);
        System.out.println("... send getAllAnswers response");
        return Response.ok(listOfAnswers_json).build();
    }

    @GET
    @Path("/{answerId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSpecificAnswer(@PathParam("answerId") String _answerId){
        //TODO This method needs to ensure authentication

        int answerId = Integer.parseInt(_answerId);
        Answer answer = answerService.findOne(answerId);
        //ResponseModel res = response.response_Status_OK(answer);
        String answer_json = jsonb.toJson(answer);
        System.out.println("... send getAllAnswers response");
        return Response.ok(answer_json).build();

    }
    @POST
    public String postAnswer(String payload) throws JsonProcessingException {
        Answer answer = jsonb.fromJson(payload, Answer.class);
        answer = answerService.save(answer);
        String res = jsonb.toJson(answer);
        return res;
    }

    @PUT
    public String updateAnswer(String payload) throws JsonProcessingException {
        Answer answer = jsonb.fromJson(payload, Answer.class);
        answer = answerService.update(answer);
        String res = jsonb.toJson(answer);
        return res;
    }

    @DELETE
    @Path("/{answerId}")
    public String deleteSpecificAnswer(@PathParam("answerId") String _answerId){
        //TODO This method needs to ensure authentication
        try {

            int answerId = Integer.parseInt(_answerId);
            Answer answer = answerService.findOne(answerId);
            answer = answerService.delete(answer);
            String res = jsonb.toJson(answer);
            if(answer != null) return res;
            else return "Answer ID provided was not formatted properly.";
        } catch (NumberFormatException ne){
            System.out.println("Answer ID provided was not formatted properly.");
        }
        return null;
    }
}
