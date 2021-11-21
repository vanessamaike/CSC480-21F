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
  getAssignmentsByProfessor,
  getTeamsByProfessor,
} from "../../axios/APIRequests";
import { BsArrowRightCircle } from "react-icons/bs";

function CourseBar({ course, history }) {
  return (
    <Stack spacing={0} >
      <CustomizedButtons
        type3
        fullwidth
        model={"arrow"}
        onClick={() => history.push("/course")}
      >
        {`${course.title}, Section ${course.sectionNumber}, ${course.semester}`}
      </CustomizedButtons>
      <>
        {course.assignments.length !== 0 ? (
          <List dense={true} sx={{flex:1}}>
            {course.assignments.map((assignment) => (
                <>
                {!assignment.isSolutionCompleted && (
                  <ListItem
                    button
                    onClick={() => history.push("/assignmentdisplay", {
                      assignmentID: assignment.assignmentID,
                    })}
                  >
                    
                    <ListItemText
                      primary={
                        <Typography component="span" fontWeight="600" variant="body2">
                          {`${assignment.title} Solution`}
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={`Due ${new Date(
                        assignment.solutionDueDateTime
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                )}
                {!assignment.isPeerReviewCompleted && (
                  <ListItem
                    button
                    onClick={() => history.push("/assignmentdisplay", {
                      assignmentID: assignment.assignmentID,
                    })}
                  >
                    <ListItemText
                      primary={
                        <Typography component="span" fontWeight="600" variant="body2">
                          {`${assignment.title} Peer Review`}
                        </Typography>
                      }
                    />
                    <ListItemText
                      primary={`Due ${new Date(
                        assignment.peerReviewDueDateTime
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                )}
                </>
              ))}
          </List>
        ) : (
          <Stack alignItems="center" p={2} >No Assignment</Stack>
        )}
      </>
    </Stack>
  );
}

function ProfessorHomeDashBoard({ history }) {
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    console.log(courses);
    if (courses !== undefined && courses.length !== 0) {
      courses.map((course, key) => {
        if (course.assignments !== undefined) {
          setLoading(false);
        }
      });
    }
  }, [courses]);

  useEffect(() => {
    getAssignmentsByProfessor()
      .then((value) => {
        setCourses(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                            Assignments by Course
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
                    <Stack sx={{flex:1}} spacing={1}>
                      {courses.map((course, key) => {
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
                              history.push("./courseresult");
                            }}
                          >
                            See All
                          </CustomizedButtons>
                        }
                      >
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
                              Quality Check
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
                        return (
                          <>
                            {course.assignments.length !== 0 ? (
                              <>
                                {course.assignments.map((assignment, key) => {
                                  return (
                                    <>
                                      {assignment.reviewStage === true ? (
                                        <ListItem
                                          button
                                          divider
                                          onClick={() =>
                                            history.push(
                                              "/studentpeerreviewqualitycheck", {assignmentID: assignment.assignmentID}
                                            )
                                          }
                                          secondaryAction={
                                            <IconButton edge="end">
                                              <BsArrowRightCircle />
                                            </IconButton>
                                          }
                                        >
                                          <ListItemText
                                            sx={{ width: "30%" }}
                                            primary={`${assignment.title}`}
                                          />
                                          <ListItemText
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                            primary={`submissions closed ${new Date(
                                              assignment.peerReviewDueDateTime
                                            ).toLocaleString()}`}
                                          />
                                        </ListItem>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              <Stack sx={{flex:1}} alignItems="center">No Assignment</Stack>
                            )}
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
                      <ListItem>
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
                              Manage Students & Teams by Course
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
                  <>
                    {loading === true ? (
                      <CircularProgress
                        className={loading.loading}
                      ></CircularProgress>
                    ) : (
                      <Grid container spacing={2}>
                        {courses.map((course, key) => {
                          return (
                            <Grid item xs={6}>
                              <CustomizedButtons
                                type2
                                fullwidth
                                onClick={() => {
                                  history.push("./studentinfoview");
                                }}
                                model={"arrow"}
                                key={key}
                              >
                                {`${course.code}, Section ${course.sectionNumber}, ${course.semester}`}
                              </CustomizedButtons>
                            </Grid>
                          );
                        })}
                      </Grid>
                    )}
                  </>
                </CardContent>
              </CustomizedCard>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CustomizedButtons
                type1
                model={"add"}
                onClick={() => history.push("/coursecreation")}
              >
                Create a New Course
              </CustomizedButtons>
            </Grid>
          </Grid>
        </Grid>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default ProfessorHomeDashBoard;
