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
import Box from '@mui/material/Box';
import GoogleLogin from 'react-google-login'
import axios from 'axios'

// styled components
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button";



function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj)
    axios.post("http://localhost9080", response)
  }
  return (

    <div>
      <NavBar fixed></NavBar>
      <div style={{ marginTop: "150px" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          margin: "0 12em",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", width: "496px" }}>
          <Typography
            style={{ fontWeight: "600" }}
            variant="h4"
            component="div"
          >
            Aliquam pulvinar nunc eget consectetur facilisis.
          </Typography>
          <Typography
            variant="h6"
            component="div"
          >
            Nulla ullamcorper efficitur nisl eget aliquet.
          </Typography>
        </div>
        <Card
          style={{ display: "flex", flexDirection: "column", margin: "0 1em", width: "422px", height: "397px", padding: "0.5em" }}
        >
          <CardContent>
            <CardHeader
              title={
                <Typography
                  style={{ fontWeight: "600" }}
                  variant="h5"
                  component="div"
                >
                  User Login
                </Typography>
              }
            ></CardHeader>
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <FormControl style={{ margin: "1em 0" }}>
              <InputLabel htmlFor="component-outlined">Email</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={email}
                onChange={handleChangeEmail}
                label="email"
                style={{ borderRadius: "10px" }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Password</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={password}
                onChange={handleChangePassword}
                label="password"
                style={{ borderRadius: "10px" }}
              />
            </FormControl>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <GoogleLogin
              clientId="149755873109-56q9cfqarsfn3kd1vc9isegskpi4s32v.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <Button></Button>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
