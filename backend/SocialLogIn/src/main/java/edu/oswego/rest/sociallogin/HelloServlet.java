// tag::copyright[]
/*******************************************************************************
 * Copyright (c) 2020 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - Initial implementation
 *******************************************************************************/
// end::copyright[]
package edu.oswego.rest.sociallogin;

import javax.servlet.ServletException;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.websphere.security.jwt.JwtToken;
import com.ibm.websphere.security.social.UserProfileManager;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet(name = "HelloServlet", urlPatterns = "/hello")
@ServletSecurity(value = @HttpConstraint(rolesAllowed = {"users"},
        transportGuarantee = ServletSecurity.TransportGuarantee.CONFIDENTIAL))
        


public class HelloServlet extends HttpServlet {



    private static final long serialVersionUID = 1L;
    ArrayList<String> AcceptedStudents = new ArrayList<String>();


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        

        String username = request.getUserPrincipal().getName();
        request.setAttribute("username", username);

        JwtToken myJWT = UserProfileManager.getUserProfile().getIdToken();
                authObject aObject = new authObject();
                String role = aObject.returnRole(myJWT);
                System.out.println("Here is your role: " + role);

        if (role != "NotAuthenticated") {   //if username is inside the text file of users in the course
                       

        request
                .getRequestDispatcher("securedHello.jsp")
                .forward(request,response);

    } else { //if user is not in text file of students in the course, just return to the log in page


        request
                .getRequestDispatcher("hello.html")
                .forward(request,response);
    }
}
}
