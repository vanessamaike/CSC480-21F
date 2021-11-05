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
} from "@mui/material";

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

function CourseBar({course}) {
  return (
    <Stack spacing={0}>
      <CustomizedButtons type3 fullwidth model={"arrow"}>
        {`${course.code}, Section ${course.sectionNumber}, ${course.semester}`}
      </CustomizedButtons>
      <List dense={true}>
        <ListItem>
          <ListItemText
            primary={
              <Typography component="span" fontWeight="600" variant="body2">
                {`${course.assignments[0].title} Solution`}
              </Typography>
            }
          />
          <ListItemText primary={`Due ${course.assignments[0].solution.dueDate}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography component="span" fontWeight="600" variant="body2">
                {`${course.assignments[0].title} Peer Review`}
              </Typography>
            }
          />
          <ListItemText primary={`Due ${course.assignments[0].peerreview.dueDate}`} />
        </ListItem>
      </List>
    </Stack>
  );
}

function ProfessorHomeDashBoard({history}) {
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(response.data);
        setLoading(false)
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }}
      getCourses()
  }, [])
  console.log(courses)
  return (
    <CustomizedBody bg={bg}>
      <NavBar></NavBar>
      <CustomizedContainer>
     
      <>
          {(loading === true) ? (
            <Loading />
          ) : (
            <>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <CustomizedCard>
              <CardHeader
                sx={{ paddingBottom: "0" }}
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
                            variant="body1"
                          >
                            Assignments by Course
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                }
              ></CardHeader>
              <CardContent sx={{ paddingTop: "0" }}>
                <Stack spacing={2}>
                {courses.map((course, key) => {
                  return <CourseBar course={course} key={key}></CourseBar>
                })}
                </Stack>
              </CardContent>
            </CustomizedCard>
          </Grid>
          <Grid item container spacing={3} xs={8}>
            <Grid item xs={12}>
              <CustomizedCard>
                <CardHeader
                  sx={{ paddingBottom: "8px" }}
                  title={
                    <List dense={true} sx={{ padding: "0", margin: "0" }}>
                      <ListItem
                        secondaryAction={
                          <CustomizedButtons type1 height1>See All</CustomizedButtons>
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
                              variant="body1"
                            >
                              Results to Review
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  }
                ></CardHeader>
                <CustomizedDivider type1></CustomizedDivider>
                <CardContent sx={{ paddingTop: 0 }}>
                  <List>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <ListItemText primary="Final submissions completed on 10/05/21" />
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <BiCheckCircle size="1.5em"></BiCheckCircle>
                        </ListItemIcon>
                        <ListItemText primary="Peer Review" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <ListItemText primary="Final submissions completed on 10/05/21" />
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <BiCheckCircle size="1.5em"></BiCheckCircle>
                        </ListItemIcon>
                        <ListItemText primary="Peer Review" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </CardContent>
              </CustomizedCard>
            </Grid>
            <Grid item xs={12}>
              <CustomizedCard>
                <CardHeader
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
                              variant="body1"
                            >
                              Manage Students & Teams by Course
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  }
                ></CardHeader>
                <CardContent sx={{ paddingTop: 0 }}>
                  <Grid container spacing={2}>
                  {courses.map((course, key) => {
                  return <Grid item xs={6}>
                  <CustomizedButtons type2 fullwidth model={"arrow"} key={key}>
                  {`${course.code}, Section ${course.sectionNumber}, ${course.semester}`}
                  </CustomizedButtons>
                </Grid>
                })}
                  </Grid>
                </CardContent>
              </CustomizedCard>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CustomizedButtons type1 model={"add"} onClick={() => history.push("/coursecreation")}>
                Create a New Course
              </CustomizedButtons>
            </Grid>
          </Grid>
        </Grid>
        </>
          )}
        </>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default ProfessorHomeDashBoard;
