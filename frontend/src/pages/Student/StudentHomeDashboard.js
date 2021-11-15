import React, { useState, useEffect } from "react";
// @mui components
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Container,
  Typography,
  Box,
  Stack,
  Divider,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Breadcrumbs,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { BiCheckCircle } from "react-icons/bi";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import bg from "../../images/multi_background_dashboard.jpg";

// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedDivider from "../../components/CustomizedDivider";
import CustomizedBody from "../../components/CustomizedBody";
import axios from "axios";
import Loading from "../../components/Loading";
import { getCoursesByProfessor, getTeamsByProfessor } from "../../axios/APIRequests";
import { BsArrowRightCircle } from "react-icons/bs";
function CourseBar({ course, history }) {
  return (
    <Stack spacing={0}>
      <CustomizedButtons type3 fullwidth model={"arrow"} onClick={() => history.push("/course")}>
        {`${course.code}, Section ${course.sectionNumber}, ${course.semester}`}
      </CustomizedButtons>
      <List dense={true}>
        <ListItem button onClick={() => history.push("/newsolutionassignmentview")}>
          <ListItemText
            primary={
              <Typography component="span" fontWeight="600" variant="body2">
                {`${course.assignments[0].title} Solution`}
              </Typography>
            }
          />
          <ListItemText
            primary={`Due ${course.assignments[0].solution.dueDate}`}
          />
        </ListItem>
        <ListItem button onClick={() => history.push("/peerreviewassignmentview")}>
          <ListItemText
            primary={
              <Typography component="span" fontWeight="600" variant="body2">
                {`${course.assignments[0].title} Peer Review`}
              </Typography>
            }
          />
          <ListItemText
            primary={`Due ${course.assignments[0].peerreview.dueDate}`}
          />
        </ListItem>
      </List>
    </Stack>
  );
}

function StudentHomeDashBoard({ history }) {
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    console.log(courses);
    if(courses !== undefined && courses.length !== 0){
      setLoading(false)
    }
  }, [courses])
  useEffect(() => {
    getCoursesByProfessor()
      .then((value) => {
        setCourses(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(courses);
  return (
    <CustomizedBody bg={bg}>
      <NavBar></NavBar>
      <CustomizedContainer>
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            Home
          </Typography>
        </Breadcrumbs>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={4.7}>
            <CustomizedCard>
              <CardHeader
                sx={{ paddingBottom: "8px" }}
                title={
                  <List dense={true} sx={{ padding: "0", margin: "0" }}>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon
                          sx={{ color: "#0DC38D" }}
                          fontSize="medium"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            fontWeight="600"
                            variant="h6"
                          >
                            Recent Results
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                }
              ></CardHeader>
              <CustomizedDivider
                type1
                sx={{ marginBottom: "15px" }}
              ></CustomizedDivider>
              <CardContent
                sx={{
                  paddingTop: "0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <>
                  {loading === true ? (
                    <CircularProgress
                      className={loading.loading}
                    ></CircularProgress>
                  ) : (
                    <Stack spacing={2}>
                      {courses.map((course, key) => {
                        return (
                          <CourseBar course={course} key={key} history={history}></CourseBar>
                        );
                      })}
                    </Stack>
                  )}
                </>
              </CardContent>
            </CustomizedCard>
          </Grid>
          <Grid item container spacing={3} xs={7.3}>
            <Grid item xs={12}>
              <CustomizedCard>
                <CardHeader
                  sx={{ paddingBottom: "8px" }}
                  title={
                    <List dense={true} sx={{ padding: "0", margin: "0" }}>
                      <ListItem
                        secondaryAction={
                          <CustomizedButtons type1 height1 onClick={()=>{history.push("./seeallassignment")}}>
                            See All
                          </CustomizedButtons>
                        }
                      >
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            sx={{ color: "#347DEB" }}
                            fontSize="medium"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              fontWeight="600"
                              variant="h6"
                            >
                              Upcoming Assignments
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  }
                ></CardHeader>
                <CustomizedDivider
                  type1
                  sx={{ marginBottom: "15px" }}
                ></CustomizedDivider>
                <CardContent
                  sx={{
                    paddingTop: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {loading === true ? (
                    <CircularProgress
                      className={loading.loading}
                    ></CircularProgress>
                  ) : (
                    <List sx={{ width: "100%" }}>
                      {courses.map((course, key) => {
                        return (<>{course.assignments.map((assignment, key) => {
                        return (
                          <>
                          {(assignment.peerreview.isReviewed === true) ? (
                            <ListItem
                            button
                            divider
                            onClick={() => history.push("/peerreviewassignmentview")}
                            secondaryAction={
                              <IconButton edge="end">
                                <BsArrowRightCircle />
                              </IconButton>
                            }
                          >
                            <ListItemText
                              sx={{ width: "30%" }}
                              primary={`${assignment.title} Peer Reviews`}
                            />
                            <ListItemText
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                              primary={`submissions closed ${assignment.peerreview.dueDate}`}
                            />
                          
                            <ListItemText
                              primary={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <FiberManualRecordIcon
                                    sx={{
                                      color: "#0DC38D",
                                      marginRight: "10px",
                                    }}
                                    fontSize="medium"
                                  />{" "}
                                  <>Needs Review</>
                                </div>
                              }
                            />
                          </ListItem>
                          ) : (
                            <></>
                          )}
                          </>
                          
                        );
                      })}
                        </>)
                      })}
                    </List>
                  )}
                </CardContent>
              </CustomizedCard>
            </Grid>
            <Grid item xs={12}>
              <CustomizedCard>
                <CardHeader
                  sx={{ paddingBottom: "8px" }}
                  title={
                    <List dense={true} sx={{ padding: "0", margin: "0" }}>
                      <ListItem button onClick={() => history.push("/studentteams")}
                            secondaryAction={
                              <IconButton edge="end">
                                <BsArrowRightCircle />
                              </IconButton>
                            }>
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            sx={{ color: "#6F40DC" }}
                            fontSize="medium"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              fontWeight="600"
                              variant="h6"
                            >
                             Manage Teams
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  }
                ></CardHeader>
                
              </CustomizedCard>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
            </Grid>
          </Grid>
        </Grid>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default StudentHomeDashBoard;