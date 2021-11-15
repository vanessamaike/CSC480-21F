import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedModal from "../../components/CustomizedModal";
import CustomizedTabs from "../../components/CustomizedTabs";

import bg from "../../images/multi_background_dashboard.jpg";
import {
  CardContent,
  CardHeader,
  Divider,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Modal,
  Fade,
  Collapse,
  Breadcrumbs,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedTextField from "../../components/CustomizedTextField";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import axios from "axios";
import Loading from "../../components/Loading";

const styles = (theme) => ({
  input: {
    height: 30,
    paddingTop: "5px",
  },
});

const AddStudentBox = (props) => {
  const {
    classes,
    handleAddStudent,
    setFirstName,
    setLastName,
    setSID,
    setEmail,
    handleCloseAddStudentBox,
  } = props;
  return (
    <Box
      sx={{
        backgroundColor: "#EDEDED",
        borderRadius: "10px",
        padding: "15px",
      }}
    >
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{
                display: "flex",
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h6"
              component="div"
            >
              Add Student to Course
            </Typography>
            <IconButton aria-label="delete" onClick={handleCloseAddStudentBox}>
              <MdOutlineCancel />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={3}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CustomizedTextField handleTextFieldChange={setFirstName}>
              First Name
            </CustomizedTextField>
            <CustomizedTextField handleTextFieldChange={setLastName}>
              Last Name
            </CustomizedTextField>
            <CustomizedTextField handleTextFieldChange={setSID}>
              Student ID
            </CustomizedTextField>
            <CustomizedTextField handleTextFieldChange={setEmail}>
              Email
            </CustomizedTextField>
            <CustomizedButtons type1 height1 onClick={handleAddStudent}>
              Add
            </CustomizedButtons>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

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

function StudentTeamsPage({ history }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [sID, setSID] = useState();
  const [email, setEmail] = useState();

  const [tab, setTab] = useState(0);
  const [viewType, setViewType] = useState("Student List");
  const [isOpenedAddStudentBox, setIsOpenedAddStudentBox] = useState(false);
  const [isCourseModalOpened, setIsCourseModalOpened] = useState(false);
  const [isStudentModalOpened, setIsStudentModalOpened] = useState(false);

  const handleAddStudent = () => {
    var newStudent = {
      firstName: firstName,
      lastName: lastName,
      studentID: sID,
      email: email,
    };
    var json = {
      courseID: 57964,
      student: newStudent,
    };
    // const json_ = JSON.stringify(json);
    // postNewStudentByProfessor(json_)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    setIsOpenedAddStudentBox(false);
  };

  const handleOpenAddStudentBox = () => setIsOpenedAddStudentBox(true);
  const handleCloseAddStudentBox = () => setIsOpenedAddStudentBox(false);
  const handleOpenCourseModal = () => setIsCourseModalOpened(true);
  const handleCloseCourseModal = () => setIsCourseModalOpened(false);
  const handleOpenStudentModal = () => setIsStudentModalOpened(true);
  const handleCloseStudentModal = () => setIsStudentModalOpened(false);
  const [teamKeys, setTeamKeys] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState();
  const [courseNames, setCourseNames] = React.useState([]);

  useEffect(() => {
    var courseNameLists = [];
    if (courses) {
      courses.map((course) => {
        courseNameLists.push(course.code);
      });
      setCourseNames(courseNameLists);
      console.log("`loading`");
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
  const handleClick = (key) => () => {
    setTeamKeys({ [key]: !teamKeys[key] });
  };

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
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary">Courses</Typography>
          <Typography color="text.primary" style={{ fontWeight: "800" }}>
            Students & Teams
          </Typography>
        </Breadcrumbs>
        <>
          {loading === true ? (
            <Loading />
          ) : (
            <>
              <Grid container sx={{ marginBottom: "20px" }}>
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
                    Student Information
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <CustomizedButtons
                    type2
                    model={"add"}
                    onClick={handleOpenCourseModal}
                  >
                    Delete Course
                  </CustomizedButtons>
                </Grid>
              </Grid>
              <div>
                <CustomizedTabs
                  type2
                  setTab={setTab}
                  value={tab}
                  labels={courseNames}
                  fullWidth={"fullWidth"}
                ></CustomizedTabs>
                {courses.map((course, key) => (
                  <TabPanel value={tab} index={key}>
                    <CustomizedCard>
                      <CardHeader
                        sx={{
                          paddingBottom: "0",
                        }}
                        title={
                          <>
                            {isOpenedAddStudentBox === false ? (
                              <Grid container>
                                <Grid item xs={9}>
                                  <div></div>
                                </Grid>
                                <Grid
                                  item
                                  xs={3}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <CustomizedButtons
                                    type3
                                    model={"add"}
                                    height1
                                    onClick={handleOpenAddStudentBox}
                                  >
                                    Add Teammate
                                  </CustomizedButtons>
                                </Grid>
                              </Grid>
                            ) : (
                              <Collapse
                                in={isOpenedAddStudentBox}
                                timeout="auto"
                                unmountOnExit
                              >
                                <AddStudentBox
                                  handleAddStudent={handleAddStudent}
                                  setFirstName={setFirstName}
                                  setLastName={setLastName}
                                  setSID={setSID}
                                  setEmail={setEmail}
                                  handleCloseAddStudentBox={
                                    handleCloseAddStudentBox
                                  }
                                ></AddStudentBox>
                              </Collapse>
                            )}
                          </>
                        }
                      ></CardHeader>
                      <CardContent
                        sx={{
                          paddingTop: "0",
                        }}
                      >
                        <List component="nav" aria-label="mailbox folders">
                          <ListItem button divider>
                            <ListItemText
                              primary={
                                <Typography
                                  component="span"
                                  fontWeight="600"
                                  variant="body1"
                                >
                                  Team {course.teams[key].teamId}
                                </Typography>
                              }
                            />
                            <ListItemText
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                              primary={`${course.teams[key].students.length} team members`}
                            />
                          </ListItem>

                          <Collapse in={true} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <>
                                {course.teams[key].students.map(
                                  (student, key) => (
                                    <ListItem
                                      key={key}
                                      button
                                      sx={{ pl: 4 }}
                                      divider
                                      secondaryAction={
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={handleOpenStudentModal}
                                        >
                                          <MdOutlineCancel />
                                        </IconButton>
                                      }
                                    >
                                      <ListItemText
                                        primary={`${student.firstName} ${student.lastName}`}
                                      />
                                    </ListItem>
                                  )
                                )}
                              </>
                            </List>
                          </Collapse>
                        </List>
                      </CardContent>
                    </CustomizedCard>
                  </TabPanel>
                ))}
              </div>
            </>
          )}
        </>
      </CustomizedContainer>
      <CustomizedModal
        modalType={"course"}
        isCourseModalOpened={isCourseModalOpened}
        handleCloseCourseModal={handleCloseCourseModal}
      />
      <CustomizedModal
        modalType={"student"}
        isStudentModalOpened={isStudentModalOpened}
        handleCloseStudentModal={handleCloseStudentModal}
      />
    </div>
  );
}

export default StudentTeamsPage;
