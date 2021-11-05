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
package edu.oswego.rest.sociallogin.socialLogin.logout;

import com.ibm.websphere.security.social.UserProfileManager;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

@RequestScoped
public class LogoutHandler {

    @Inject
    private GoogleLogout googleLogout;

    private static final String GOOGLE_LOGIN = "googleLogin";

    public ILogout getLogout() {

        String socialMediaName = UserProfileManager.getUserProfile().getSocialMediaName();
        switch (socialMediaName) {
            case GOOGLE_LOGIN:
                return googleLogout;
            default:
                throw new UnsupportedOperationException("Cannot find the right logout " +
                        "service for social media name " + socialMediaName);
        }
    }
}
