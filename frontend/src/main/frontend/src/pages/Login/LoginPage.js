import React, { useState } from "react";
// @mui components
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GoogleLogin from "react-google-login";
import axios from "axios";
import bg from "../../images/multi_background_login.jpg";
import { useDispatch } from "react-redux";
import { setUser, setUserName } from "../../features/userSlice";
// styled components
import NavBarLogin from "../../components/NavBar/NavBarLogin";
import { Stack } from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedBody from "../../components/CustomizedBody";
import { loginAuth } from "../../axios/APIRequests";
import CustomizedButtons from "../../components/CustomizedButtons";

const CLIENT_ID = "637717333332-2fauonnc42evp1f3qfi7e4br0okm5cu8.apps.googleusercontent.com"

function LoginPage({ history }) {
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    if(response.profileObj === undefined || response.tokenId === undefined) return
    dispatch(setUserName(response.profileObj.name));
    signIn(response.tokenId)
  };


  const signIn = (tokenId) => {
    // setAuthToken()
    
    loginAuth(tokenId)
      .then(function (response) {
        dispatch(setUser(response));
        localStorage.token = response.token;
        localStorage.userID = response.userID;
        if(response.role === "professor") {
          history.push("./professorhome");
        } else {
          history.push("./studenthome");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <CustomizedBody bg={bg}>
      <NavBarLogin></NavBarLogin>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          margin: "1em 12em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            width: "496px",
          }}
        >
          <Typography
            style={{ fontWeight: "600" }}
            variant="h4"
            component="div"
          >
            A proven system to improve student grade outcomes.
          </Typography>
          <Typography variant="h6" component="div">
            Distribute assignments and collect peer reviews with accuracy and
            efficiency while utilizing this effective learning method.
          </Typography>
        </div>
        <CustomizedCard
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "3em 1em",
            width: "422px",
            height: "auto",
            padding: "0.5em",
          }}
        >
          <CardHeader
            sx={{ paddingBottom: "0" }}
            title={
              <Typography
                style={{ fontWeight: "600" }}
                variant="h5"
                component="div"
              >
                Google Login
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Typography
              style={{ fontWeight: "400" }}
              variant="h6"
              component="div"
            >
              Select your role to begin
            </Typography>
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Professor"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Student"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Stack>
          </CardContent>
        </CustomizedCard>
      </div>
    </CustomizedBody>
  );
}

export default LoginPage;
