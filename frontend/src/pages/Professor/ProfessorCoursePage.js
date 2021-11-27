import React, { useState, useEffect } from "react";
// @mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TiDelete } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
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
import CustomizedModal from "../../components/CustomizedModal";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";
import axios from "axios";
import {
  getAssignmentsByProfessor,
  deleteAssignmentByProfessor,
} from "../../axios/APIRequests";
import { MdOutlineCancel } from "react-icons/md";
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
  const [error, setError] = useState("")
  const { user, isAuthenticated, authLoading } = getUser;
  const [filterType, setFilterType] = React.useState("All");
  const [courses, setCourses] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);
  const [courseNames, setCourseNames] = React.useState([]);
  const [isAssignmentModalOpened, setIsAssignmentModalOpened] = useState(false);
  const handleOpenAssignmentModal = () => setIsAssignmentModalOpened(true);
  const handleCloseAssignmentModal = () => setIsAssignmentModalOpened(false);
  const [deletedAssignmentID, setDeletedAssignmentID] = useState()
  const handleGetAssignmentByProfessor = () => {
    getAssignmentsByProfessor()
    .then((value) => {
      console.log(value);
      setCourses(value);
    })
    .catch((err) => {
      console.log(err);
      setError(err)
    });
  }
  useEffect(() => {
    var nameLists = [];
    console.log(courses);
    if (courses !== undefined) {
      courses.map((course) => {
        nameLists.push(course.code);
      });
      setCourseNames(nameLists);
      setLoading(false);
    }
    return () => {
      console.log("unmount");
    };
  }, [courses]);
  useEffect(() => {
    handleGetAssignmentByProfessor()
    return () => {
      console.log("unmount");
    };
  }, []);
 
  const handleDeleteAssignment = () => {
    deleteAssignmentByProfessor(deletedAssignmentID)
      .then((value) => {
        console.log(value);
        handleGetAssignmentByProfessor()
        handleCloseAssignmentModal(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            Course
          </Typography>
        </Breadcrumbs>
        <>
          {loading === true ? (
            <Loading error={error}/>
          ) : (
            <>
              {courses.length === 0 ? (
                <CustomizedCard>
                  <CardContent>
                  <Stack style={{flex:1}} alignItems="center">Please create a new course</Stack>
                  </CardContent>
                </CustomizedCard>
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
                                <Grid item xs={6}>
                                  <CustomizedButtons
                                    type2
                                    model={"add"}
                                    onClick={() =>
                                      history.push("/assignmentcreation", {
                                        courseID: course.courseID,
                                      })
                                    }
                                  >
                                    Create New Assignment
                                  </CustomizedButtons>
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <CustomizedButtons
                                    type3
                                    model={"radio1"}
                                    fullwidth
                                    filterType={filterType}
                                    setFilterType={setFilterType}
                                  >
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
                            {course.assignments.map((assignment, key) => {
                              return (
                                <>
                                  {(filterType === "All" ||
                                    (filterType === "Draft") ===
                                      assignment.draft) && (
                                    <ListItem
                                      key={key}
                                      button
                                      divider
                                      secondaryAction={
                                        <IconButton edge="end">
                                          <MdDelete
                                            style={{
                                              color: "red",
                                              size: "1.5em",
                                            }}
                                            onClick={()=>{
                                              handleOpenAssignmentModal()
                                              setDeletedAssignmentID(assignment.assignmentID)
                                            }}
                                          />
                                        </IconButton>
                                      }
                                    >
                                      <ListItemText
                                        onClick={() =>{
                                          console.log("go")
                                          history.push("/assignmentdisplay", {
                                            assignmentID: assignment.assignmentID,
                                          })}
                                        }
                                        sx={{ fontWeight: "800" }}
                                        primary={
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Typography
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                fontWeight: "600",
                                              }}
                                              variant="body1"
                                              component="div"
                                            >
                                            {assignment.title}
                                            
                                            </Typography>
                                            <Stack direction="row">
                                              <Typography
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  fontWeight: "600",
                                                }}
                                                variant="body1"
                                                component="div"
                                              >
                                                Preview
                                              </Typography>
                                            </Stack>
                                          </div>
                                        }
                                        secondary={
                                          <Grid container>
                                            <Grid
                                              item
                                              xs={12}
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <Typography
                                                variant="body2"
                                                component="div"
                                              >
                                                Solution
                                              </Typography>
                                              <Typography
                                                variant="body2"
                                                component="div"
                                              >
                                                Due Date:{" "}
                                                {new Date(
                                                  assignment.solutionDueDateTime
                                                ).toLocaleString()}
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={12}
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <Typography
                                                variant="body2"
                                                component="div"
                                              >
                                                Peer Review
                                              </Typography>
                                              <Typography
                                                variant="body2"
                                                component="div"
                                              >
                                                Due Date:{" "}
                                                {new Date(
                                                  assignment.peerReviewDueDateTime
                                                ).toLocaleString()}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        }
                                      />
                                    </ListItem>
                                  )}
                                </>
                              );
                            })}
                          </CardContent>
                        </CustomizedCard>
                      </TabPanel>
                    );
                  })}
                </div>
                </>
              )}
            </>
          )}
        </>
        <CustomizedModal
        modalType={"assignment"}
        isAssignmentModalOpened={isAssignmentModalOpened}
        handleCloseAssignmentModal={handleCloseAssignmentModal}
        handleDeleteAssignment={handleDeleteAssignment}
      />
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default ProfessorCourse;
