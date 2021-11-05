import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

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
  Breadcrumbs
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectCourses, getCoursesByUserId } from "../../features/coursesSlice";
import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";

const demoData = [
  { name: "Peer Review 1", date: "10/07/21", type: "Completed" },
  { name: "Peer Review 2", date: "11/07/21", type: "Needs Review" },
  { name: "Peer Review 3", date: "13/07/21", type: "Needs Review" },
  { name: "Peer Review 4", date: "12/07/21", type: "Completed" },
];

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

function CourseResultPage({ history }) {

  const dispatch = useDispatch();
  const getCourses = useSelector(selectCourses);
  const { courses, loading, error } = getCourses;
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;

  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
      <Breadcrumbs aria-label="breadcrumb" mb={8}>
          <Typography color="text.primary">Student Dashboard</Typography>
          <Typography color="text.primary">Peer Review Results</Typography>
        </Breadcrumbs>
              <Grid container sx={{ marginBottom: "20px" }} spacing={9}>
                <Grid item xs={9}>
                  <Typography
                    style={{
                      display: "flex",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                    variant="h6"
                    component="div"
                  >
                    Solution Quality Check
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <CustomizedButtons type1 model={"checked"}>
                    Send for Reviews
                  </CustomizedButtons>
                </Grid>
              </Grid>
              <div>
                <CustomizedCard>
                  <CardContent sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <Stack >
                          <Typography
                            style={{
                              display: "flex",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                            variant="body1"
                            component="div"
                          >
                            Functional Requirements Modeling
                          </Typography>
                          <Typography
                            style={{
                              display: "flex",
                              textAlign: "center",
                            }}
                            variant="body2"
                            component="div"
                          >
                            Submissions closed 11:59pm 10/7/21
                          </Typography>
                      </Stack>
                        <CustomizedButtons type3 model={"download"}>
                          Download Solutions
                        </CustomizedButtons>
                  </CardContent>
                </CustomizedCard>
               
              </div>

              
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default CourseResultPage;
