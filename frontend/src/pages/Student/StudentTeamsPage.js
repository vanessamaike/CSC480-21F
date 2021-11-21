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
import CustomizedBody from "../../components/CustomizedBody";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedTextField from "../../components/CustomizedTextField";
import CustomizedContainer from "../../components/CustomizedContainer";
import Loading from "../../components/Loading";
import { getTeamsByProfessor, getTeamsByStudent } from "../../axios/APIRequests";

const styles = (theme) => ({
  input: {
    height: 30,
    paddingTop: "5px",
  },
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

function StudentTeamsPage({ history }) {

  const [tab, setTab] = useState(0);
  const [teamKeys, setTeamKeys] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState();
  const [courseNames, setCourseNames] = React.useState([]);

  useEffect(() => {
    var courseNameLists = [];
    if (courses !== undefined && courses.length !== 0) {
      courses.map((course) => {
        courseNameLists.push(course.code);
      });
      setCourseNames(courseNameLists);
      console.log("`loading`");
      setLoading(false);
    }
  }, [courses]);
  useEffect(() => {
    getTeamsByStudent()
    .then((value) => {
      console.log(value);
      setCourses(value);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  const handleClick = (key) => () => {
    setTeamKeys({ [key]: !teamKeys[key] });
  };

  return (
    <CustomizedBody bg={bg}>
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
                      <CardContent
                        sx={{
                          paddingTop: "0",
                        }}
                      >
                       <List component="nav">
                            {course.teams.map((team, key) => {
                              const open = teamKeys[key] || false;
                              return (
                                <div key={key}>
                                  <ListItem
                                    button
                                    divider
                                    secondaryAction={
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                      >
                                        {open ? (
                                           <IoIosArrowDropup />
                                        ) : (
                                          <IoIosArrowDropdown />
                                        )}
                                      </IconButton>
                                    }
                                    onClick={handleClick(key)}
                                  >
                                    <ListItemText
                                      primary={`Team ${key + 1}`}
                                    />
                                    <ListItemText
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                      primary={`${team.students.length} team members`}
                                    />
                                  </ListItem>

                                  <Collapse
                                    in={open}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List component="div" disablePadding>
                                      <>
                                        {team.students.map((student, key) => (
                                          <ListItem
                                            key={key}
                                            button
                                            sx={{ pl: 4 }}
                                            divider
                                          >
                                            <ListItemText
                                              primary={`${student.firstName} ${student.lastName}`}
                                            />
                                          </ListItem>
                                        ))}
                                      </>
                                    </List>
                                  </Collapse>
                                </div>
                              );
                            })}
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
    </CustomizedBody>
  );
}

export default StudentTeamsPage;
