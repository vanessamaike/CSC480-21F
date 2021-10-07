package edu.oswego.rest.controller.answer;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("api")
public class AnswerApplication extends Application {
        public AnswerApplication ()
        {
            System.out.println(" ... Answer Application started ");
        }
}