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

import javax.servlet.ServletException;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.*;  
import java.util.Scanner;  
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

        AcceptedStudents.add("jowens4@oswego.edu");
        AcceptedStudents.add("hayesandy5@gmail.com");
        AcceptedStudents.add("pboisnie@oswego.edu");

        String username = request.getUserPrincipal().getName();
      
        if (AcceptedStudents.contains(username)) {   //if username is inside the text file of users in the course 

                System.out.println("username is inside the arraylist");
                System.out.println("request.get" + request.getAttribute(username));

        request
                .getRequestDispatcher("securedHello.jsp")
                .forward(request,response);

    } else { //if user is not in text file of students in the course, just return to the log in page

        System.out.println("username is not inside the arraylist");

        request
                .getRequestDispatcher("hello.html")
                .forward(request,response);
    }

            }}
