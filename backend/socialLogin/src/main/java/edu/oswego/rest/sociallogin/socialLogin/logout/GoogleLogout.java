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
package io.openliberty.guides.sociallogin.logout;

import com.ibm.websphere.security.social.UserProfileManager;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RequestScoped
public class GoogleLogout implements ILogout {
    @Inject
    @ConfigProperty(name="google.client.id")
    private String clientId;

    @Inject
    @ConfigProperty(name="google.client.secret")
    private String clientSecret;

    public Response logout() {
        final String unauthorizeUrl = "https://oauth2.googleapis.com/revoke";
        String accessToken = UserProfileManager.getUserProfile().getAccessToken();
//        Map<String,String> requestBody = new HashMap<>();
//        requestBody.put("access_token",accessToken);
//
//        String auth = clientId + ":" +clientSecret;
//        byte[] encodedAuthStream = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.ISO_8859_1));
//        String encodedAuth = new String(encodedAuthStream);
//
//        return ClientBuilder.newClient().target(unauthorizeUrl).resolveTemplate("client_id",clientId).request().header("Authorization","Basic "+encodedAuth).method("DELETE", Entity.json(requestBody));
        return ClientBuilder.newClient().target(unauthorizeUrl).request().post(Entity.entity(accessToken, MediaType.TEXT_PLAIN_TYPE));
    }
}
