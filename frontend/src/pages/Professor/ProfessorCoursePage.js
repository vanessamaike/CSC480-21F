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
import { selectCourses, getCoursesByUserId } from "../../features/coursesSlice";
import Loading from "../../components/Loading"
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
  const getCourses = useSelector(selectCourses);
  const { courses, loading, error } = getCourses;
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;

  const [tab, setTab] = React.useState(0);
  const [courseNames, setCourseNames] = React.useState([]);
  useEffect(() => {
    dispatch(getCoursesByUserId());
  }, [dispatch]);
  useEffect(() => {
    var nameLists = [];
    if (courses != null) {
      courses.map((course) => {
        nameLists.push(course.code);
      });
      setCourseNames(nameLists);
    }
  }, [courses]);
  console.log(getCourses)
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
      <>
          {(error === true || loading === true) ? (
            <Loading />
          ) : (
            <>
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
                setTab={setTab}
                tab={tab}
                courseNames={courseNames}
              ></CustomizedTabs>
              {courses.map((course, key) => {
              
                console.log(course)
                return <TabPanel value={tab} index={key}>
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
                          <Grid
                            item
                            xs={5}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
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
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                            primary={assignment.solutionDueDate}
                          />
                        </ListItem>
                      ))}
                    </CardContent>
                  </CustomizedCard>
                </TabPanel>
              })}
            </div>
            </>
          )}
        </>
      </CustomizedContainer>
    </div>
  );
}

export default ProfessorCourse;
