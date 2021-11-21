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
import {
  getAssignmenstByStudent,
  getResultsByStudent,
} from "../../axios/APIRequests";
import { BsArrowRightCircle } from "react-icons/bs";
function CourseBar({ course, history }) {
  return (
    <Stack spacing={0}>
      <CustomizedButtons
        type3
        fullwidth
        
        onClick={() => history.push("/studentresults")}
      >
        {`${course.title}, Section ${course.sectionNumber}, ${course.semester}`}
      </CustomizedButtons>
      <List dense={true} sx={{flex:1}}>
        {course.assignments.map((assignment) => (
          <>
            {!assignment.draft && (
              <>
                {assignment.averageScore !== -1 ? (
                  <ListItem
                    button
                    divider
                    onClick={() =>
                      history.push("/studentpeerreviewresultsdisplay", {
                        assignmentID: assignment.assignmentID,
                      })
                    }
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <BsArrowRightCircle />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${assignment.title}`} />
                    <ListItemText primary={"Completed"} />
                    <ListItemText
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                      primary={"Score: " + `${Math.round(assignment.averageScore)}`}
                    />
                  </ListItem>
                ) : (
                  <ListItem
                    button
                    divider
                    disabled
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <BsArrowRightCircle />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${assignment.title}`} />
                    <ListItemText primary={"In process"} />
                  </ListItem>
                )}
              </>
            )}
          </>
        ))}
      </List>
    </Stack>
  );
}

function StudentHomeDashBoard({ history }) {
  const [loading, setLoading] = React.useState(true);
  const [assignmentCourses, setAssignmentCourses] = React.useState([]);
  const [resultCourses, setResultCourses] = React.useState([]);
  useEffect(() => {
    console.log(assignmentCourses);
    if (assignmentCourses === undefined || assignmentCourses.length === 0) return
    if (resultCourses === undefined || resultCourses.length === 0) return
    setLoading(false);
  }, [assignmentCourses,resultCourses ]);
  useEffect(() => {
    getAssignmenstByStudent()
      .then((value) => {
        console.log(value);
        setAssignmentCourses(value);
        getResultsByStudent()
          .then((value) => {
            console.log(value);
            setResultCourses(value);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(assignmentCourses)
  console.log(resultCourses)
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
                    <Stack sx={{flex:1}} spacing={2}>
                      {resultCourses.map((course, key) => {
                        return (
                          <CourseBar
                            course={course}
                            key={key}
                            history={history}
                          ></CourseBar>
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
                          <CustomizedButtons
                            type1
                            height1
                            onClick={() => {
                              history.push("./seeallassignment");
                            }}
                          >
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
                      {assignmentCourses.map((course, key) => {
                        return (
                          <>
                            {course.assignments.map((assignment, key) => {
                              return (
                                <>
                                  {!assignment.draft && (
                                    <>
                                      {!assignment.isSolutionCompleted && (
                                        <ListItem
                                          key={key}
                                          button
                                          divider
                                          onClick={() => {
                                            history.push(
                                              "./newsolutionassignmentview",
                                              { assignment: assignment }
                                            );
                                          }}
                                          secondaryAction={
                                            <IconButton edge="end">
                                              <BsArrowRightCircle />
                                            </IconButton>
                                          }
                                        >
                                          <ListItemText
                                            primary={`${assignment.title} Solution`}
                                          />
                                          {assignment.isSolutionCompleted ? (
                                            <ListItemText
                                              sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                              }}
                                              primary={`Completed ${new Date(
                                                assignment.solutionDueDateTime
                                              ).toLocaleString()}`}
                                            />
                                          ) : (
                                            <ListItemText
                                              sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                              }}
                                              primary={`Due ${new Date(
                                                assignment.solutionDueDateTime
                                              ).toLocaleString()}`}
                                            />
                                          )}
                                        </ListItem>
                                      )}
                                      {!assignment.isPeerReviewCompleted && (
                                        <>
                                          {assignment.reviewStage === true && (
                                            <ListItem
                                              key={key}
                                              button
                                              divider
                                              onClick={() => {
                                                history.push(
                                                  "./peerreviewassignmentview",
                                                  {
                                                    assignmentID:
                                                      assignment.assignmentID,
                                                  }
                                                );
                                              }}
                                              secondaryAction={
                                                <IconButton edge="end">
                                                  <BsArrowRightCircle />
                                                </IconButton>
                                              }
                                            >
                                              <ListItemText
                                                primary={`${assignment.title} Peer Review`}
                                              />
                                              {assignment.isPeerReviewCompleted ? ( //assignment.peerreview.isCompleted === true
                                                <ListItemText
                                                  sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                  }}
                                                  primary={`Completed ${new Date(
                                                    assignment.peerReviewDueDateTime
                                                  ).toLocaleString()}`}
                                                />
                                              ) : (
                                                <ListItemText
                                                  sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                  }}
                                                  primary={`Due ${new Date(
                                                    assignment.peerReviewDueDateTime
                                                  ).toLocaleString()}`}
                                                />
                                              )}
                                            </ListItem>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              );
                            })}
                          </>
                        );
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
                      <ListItem
                        button
                        onClick={() => history.push("/studentteams")}
                        secondaryAction={
                          <IconButton edge="end">
                            <BsArrowRightCircle />
                          </IconButton>
                        }
                      >
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
            ></Grid>
          </Grid>
        </Grid>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default StudentHomeDashBoard;
