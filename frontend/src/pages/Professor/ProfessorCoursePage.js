import React, { useState } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedRadios from "../../components/CustomizedRadios";
import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import {
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      sx={{ borderRadius: "10px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function ProfessorCourse({ history }) {
  const [value, setValue] = React.useState(0);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: "80vh",
        backgroundSize: "cover",
        paddingTop: "150px",
      }}
    >
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <Grid container sx={{ marginBottom: "20px" }}>
          <Grid item xs={8}>
            <Typography
              style={{
                display: "flex",
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h6"
              component="div"
            >
              Courses and Assignments
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Stack direction="row" spacing={2}>
              <Link
              to="/coursecreation"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <CustomizedButtons type2 model={"add"}>
                Create Course
              </CustomizedButtons>
            </Link>
            <Link
              to="/studentinfoview"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <CustomizedButtons type1>View Student Info</CustomizedButtons>
            </Link>
            </Stack>
            
          </Grid>
        </Grid>
        <div>
          <CustomizedTabs
            type1
            setValue={setValue}
            value={value}
          ></CustomizedTabs>
          {[1, 2, 3, 4].map((id) => (
          <TabPanel value={value} index={id - 1}>
            <CustomizedCard>
              <CardHeader
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                title={
                  <Grid container>
                    <Grid item xs={7}>
                      <Link
                        to="/assignmentcreation"
                        style={{ textDecoration: "none", color: "#000" }}
                      >
                        <CustomizedButtons type3 model={"add"}>
                          Create New Assignment
                        </CustomizedButtons>
                      </Link>
                    </Grid>
                    <Grid item xs={5} sx={{display: "flex", justifyContent: "flex-end"}}>
                    <CustomizedButtons type3 model={"radio1"}>
                          Filter Assignment
                        </CustomizedButtons>
                      
                    </Grid>
                  </Grid>
                }
              ></CardHeader>
              <CardContent
                sx={{
                  paddingTop: "0",
                }}
              >
                {[1, 2, 3].map((value) => (
                  <ListItem
                    button
                    divider
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <BsArrowRightCircle />
                      </IconButton>
                    }
                  >
                    <ListItemText primary="Solution 2" />
                    <ListItemText
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      primary="Due 10/01/21"
                    />
                  </ListItem>
                ))}
              </CardContent>
            </CustomizedCard>
          </TabPanel>
          ))}
        </div>
      </CustomizedContainer>
    </div>
  );
}

export default ProfessorCourse;
