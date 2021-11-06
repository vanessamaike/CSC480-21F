import React, { useState, useEffect } from "react";
// @mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import {
  Breadcrumbs,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";
import axios from "axios";
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
  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;
  const [courses, setCourses] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);
  const [courseNames, setCourseNames] = React.useState([]);
  // useEffect(() => {
  //   if(courses)
  //   {
  //     dispatch(getCoursesByUserId());
  //     console.log("dispatch")
  //   }
  // }, [dispatch]);
  useEffect(() => {
    var nameLists = [];
    if (courses) {
      courses.map((course) => {
        nameLists.push(course.code);
      });
      setCourseNames(nameLists);
      setLoading(false);
    }
  }, [courses]);
  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCourses();
  }, []);
  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
      <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary" style={{fontWeight:"600"}}>Course</Typography>
        </Breadcrumbs>
        <>
          {loading === true ? (
            <Loading />
          ) : (
            <>
              <Grid container sx={{ marginBottom: "20px" }}>
                <Grid
                  item
                  xs={8}
                  sx={{ display: "flex", alignItems: "center" }}
                >
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
                    <CustomizedButtons
                      type2
                      model={"add"}
                      onClick={() => history.push("/coursecreation")}
                    >
                      Create Course
                    </CustomizedButtons>
                    <CustomizedButtons
                      type1
                      onClick={() => history.push("/studentinfoview")}
                    >
                      View Student Info
                    </CustomizedButtons>
                  </Stack>
                </Grid>
              </Grid>
              <div>
                <CustomizedTabs
                  type1
                  setTab={setTab}
                  tab={tab}
                  fullWidth={"fullWidth"}
                  labels={courseNames}
                ></CustomizedTabs>
                {courses.map((course, key) => {
                  return (
                    <TabPanel value={tab} index={key}>
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
                                <CustomizedButtons
                                  type3
                                  model={"add"}
                                  onClick={() =>
                                    history.push("/assignmentcreation")
                                  }
                                >
                                  Create New Assignment
                                </CustomizedButtons>
                              </Grid>
                              <Grid
                                item
                                xs={5}
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
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
                          {course.assignments.map((assignment, key) => (
                            <ListItem
                              key={key}
                              button
                              divider
                              secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                  <BsArrowRightCircle />
                                </IconButton>
                              }
                            >
                              <ListItemText primary={assignment.title} />
                              <ListItemText
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                                primary={assignment.solutionDueDate}
                              />
                            </ListItem>
                          ))}
                        </CardContent>
                      </CustomizedCard>
                    </TabPanel>
                  );
                })}
              </div>
            </>
          )}
        </>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default ProfessorCourse;
