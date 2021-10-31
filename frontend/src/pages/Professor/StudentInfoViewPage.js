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
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectCourses, getCoursesByUserId } from "../../features/coursesSlice";
const styles = (theme) => ({
  input: {
    height: 30,
    paddingTop: "5px",
  },
});

const AddStudentBox = withStyles(styles)((props) => {
  const { classes, handleAddStudent } = props;

  return (
    <Box
      sx={{ height: "115px", backgroundColor: "#EDEDED", borderRadius: "20px" }}
    >
      <List dense="false">
        <ListItem disablePadding>
          <ListItem>
            <ListItemText
              primary={
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
              }
            />
          </ListItem>
        </ListItem>
        <ListItem disablePadding>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              sx={{ bgcolor: "#fff" }}
              label="Name"
              id="outlined-size-small"
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
            <TextField
              sx={{ bgcolor: "#fff" }}
              label="Student ID"
              id="outlined-size-small"
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
            <TextField
              sx={{ bgcolor: "#fff" }}
              label="Email"
              id="outlined-size-small"
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
            <CustomizedButtons type1 height1 onClick={handleAddStudent}>
              Add
            </CustomizedButtons>
          </ListItem>
        </ListItem>
      </List>
    </Box>
  );
});

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

function StudentInfoViewPage({ history }) {
  const [tab, setTab] = useState(0);
  const [viewType, setViewType] = useState("Student List");
  const [isOpenedAddStudentBox, setIsOpenedAddStudentBox] = useState(false);
  const [isCourseModalOpened, setIsCourseModalOpened] = useState(false);
  const [isStudentModalOpened, setIsStudentModalOpened] = useState(false);
  const handleAddStudent = () => setIsOpenedAddStudentBox(false);
  const handleOpenAddStudentBox = () => setIsOpenedAddStudentBox(true);
  const handleOpenCourseModal = () => setIsCourseModalOpened(true);
  const handleCloseCourseModal = () => setIsCourseModalOpened(false);
  const handleOpenStudentModal = () => setIsStudentModalOpened(true);
  const handleCloseStudentModal = () => setIsStudentModalOpened(false);
  const [teamKeys, setTeamKeys] = useState({});

  const dispatch = useDispatch();
  const getCourses = useSelector(selectCourses);
  const { courses, loading, error } = getCourses;
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;
  
  const [courseNames, setCourseNames] = React.useState([]);
  useEffect(() => {
      dispatch(getCoursesByUserId());
  }, [dispatch]);
  useEffect(() => {
    var nameLists = []
    courses.map((course) => {
        nameLists.push(course.code)
    })
    setCourseNames(nameLists)
}, [courses]);
  const handleClick = key => () => {
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
          <CustomizedTabs type2 setTab={setTab} value={tab} courseNames={courseNames}></CustomizedTabs>
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
                          <Grid item xs={3}>
                            <CustomizedButtons
                              type3
                              sx={{ width: "170px" }}
                              model={"add"}
                              model={"switch"}
                              setViewType={setViewType}
                            >
                              {viewType}
                            </CustomizedButtons>
                          </Grid>
                          <Grid
                            item
                            xs={9}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <CustomizedButtons
                              type3
                              model={"add"}
                              onClick={handleOpenAddStudentBox}
                            >
                              Add new student
                            </CustomizedButtons>
                          </Grid>
                        </Grid>
                      ) : (
                        <AddStudentBox
                          handleAddStudent={handleAddStudent}
                        ></AddStudentBox>
                      )}
                    </>
                  }
                ></CardHeader>
                <CardContent
                  sx={{
                    paddingTop: "0",
                  }}
                >
                  {viewType === "Student List" ? (
                    <List component="nav" aria-label="mailbox folders">
                      {[1, 2, 3].map((value) => (
                        <ListItem
                          button
                          divider
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={handleOpenStudentModal}>
                              <MdOutlineCancel />
                            </IconButton>
                          }
                          
                        >
                          <ListItemText primary="Student Name" />
                          <ListItemText
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                            primary="Added via CSV upload 08/13/21"
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <List component="nav" aria-label="mailbox folders">
                      {course.teams.map((team, key) => {
                        const open = teamKeys[key] || false;
                        return (
                        <div key={key}>
                        <ListItem
                          button
                          divider
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                              {open ? <IoIosArrowDropdown /> : <IoIosArrowDropup/>}
                            </IconButton>
                          }
                          onClick={handleClick(key)}
                        >
                          <ListItemText primary={`Team ` + team.teamId} />
                          <ListItemText
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                            primary="3 team members"
                          />

                        </ListItem>
                        
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <>
                        {team.students.map((student, key) => (
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
                                  <ListItemText primary={student.firstName} />
                                </ListItem>
                        ))}</>
                        </List>
                      </Collapse>
                        </div>)
                      })}
                    </List>
                  )}
                </CardContent>
              </CustomizedCard>
            </TabPanel>
          ))}
        </div>
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

export default StudentInfoViewPage;
