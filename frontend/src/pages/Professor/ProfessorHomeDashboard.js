import React from "react";
// @mui components
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
// styled components
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button";
import Stack from "@mui/material/Stack";
function ProfessorHomeDashBoard() {
  return (
    <div>
      <NavBar fixed></NavBar>
      <div style={{ marginTop: "150px" }}></div>
      <div style={{ display: "flex", justifyContent: "space-around", flexDirection:"column", margin: "0 12em"}}>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "1em 0" }}>
          <Card style={{ margin: "0 1em", padding: "1em 1em" }} sx={{ minWidth: 500 }}>
            <CardHeader
                title={
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="h6"
                    component="div"
                  >
                    Courses
                  </Typography>
                }
                action={
                  <Button text={"See All"}></Button>
                }
              ></CardHeader>
              
            <CardContent>
              
            </CardContent>
          </Card>
          <Card style={{ margin: "0 1em" }} sx={{ minWidth: 500 }}>
            <CardContent>
            <CardHeader
                title={
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="h6"
                    component="div"
                  >
                    Assignment
                  </Typography>
                }
                action={
                  <Button text={"See All"}></Button>
                }
              ></CardHeader>
            </CardContent>
          </Card>
        </div>
        <Card style={{ margin: "0 1em" }} sx={{ minWidth: 500 }}>
            <CardContent>
              <CardHeader
                title={
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="h6"
                    component="div"
                  >
                    Results
                  </Typography>
                }
                action={
                  <Button text={"See All"}></Button>
                }
              ></CardHeader>
            </CardContent>
            <CardContent>
              
            </CardContent>
          </Card>
      </div>
      
    </div>
  );
}

export default ProfessorHomeDashBoard;