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
import bg from '../../images/multi_background_login.jpg'
import { useSelector,useDispatch } from "react-redux";
import { setUser, selectUser } from "../../features/userSlice";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import { Stack } from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedBody from "../../components/CustomizedBody";
function RoleButton() {
  return (
    <Box
      sx={{
        display: "flex",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        overflow: "hidden",
        px: 2,
        py: 1,
        cursor: "pointer",
        borderRadius: 10,
        color: "#ffffff",
        bgcolor: "#000000",
        "&:hover": {
          backgroundColor: "#000000",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Typography style={{ fontWeight: "600" }} variant="h6" component="div">
        Professor
      </Typography>
    </Box>
  );
}

function LoginPage() {
  const dispatch = useDispatch();
  const userModel = {
    "userId": 1,
    "email": "dtran4@oswego.edu",
    "role": "professor"
  }
  const handleLogin = () => {
    dispatch(setUser(userModel));

  }
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    //axios.post("http://localhost9080", response);
  };
  return (

    <CustomizedBody bg={bg}> 
      <NavBar></NavBar>
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
          Distribute assignments and collect peer reviews with accuracy and efficiency while utilizing this effective learning method. 
          </Typography>
        </div>
        <CustomizedCard
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 1em",
            width: "422px",
            height: "397px",
            padding: "0.5em",
          }}
        >
          <CardHeader
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
                clientId="149755873109-56q9cfqarsfn3kd1vc9isegskpi4s32v.apps.googleusercontent.com"
                buttonText="Professor"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <GoogleLogin
                clientId="149755873109-56q9cfqarsfn3kd1vc9isegskpi4s32v.apps.googleusercontent.com"
                buttonText="Student"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <CustomizedButtons fulllwidth type2 onClick={handleLogin}>Log in</CustomizedButtons>
            </Stack>
          </CardContent>
        </CustomizedCard>
      </div>
    </CustomizedBody>
  );
}

export default LoginPage;
