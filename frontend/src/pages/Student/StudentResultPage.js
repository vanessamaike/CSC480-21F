import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import { getResultsByStudent } from "../../axios/APIRequests";
import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import {
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

const demoData = [
  {
    name: "Peer Review 1",
    date: "10/07/21",
    type: "Completed",
    deadline: "10/01/21",
  },
  {
    name: "Peer Review 2",
    date: "11/07/21",
    type: "Upcoming",
    deadline: "10/01/21",
  },
  {
    name: "Peer Review 3",
    date: "13/07/21",
    type: "Upcoming",
    deadline: "10/01/21",
  },
  {
    name: "Peer Review 4",
    date: "12/07/21",
    type: "Completed",
    deadline: "10/01/21",
  },
];

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

function StudentResultPage({ history }) {
  const [tab, setTab] = useState(0);
  const [filterType, setFilterType] = useState("All");
  const [items, setItems] = useState(demoData);
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
    getResultsByStudent()
      .then((value) => {
        console.log(value);
        setCourses(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(filterType);
    const filteredItems = demoData.filter((item) => {
      return item.type == filterType || filterType === "All";
    });
    setItems(filteredItems);
  }, [filterType]);
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
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            CourseResults
          </Typography>
        </Breadcrumbs>
        <>
          {loading === true ? (
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
                    Results
                  </Typography>
                </Grid>
              </Grid>
              <div>
                <CustomizedTabs
                  type3
                  setTab={setTab}
                  value={tab}
                  fullWidth={"fullWidth"}
                  labels={courseNames}
                ></CustomizedTabs>
                {courses.map((course, id) => (
                  <TabPanel value={tab} index={id}>
                    <CustomizedCard>
                      <CardContent>
                        {course.assignments.map((assignment) => (
                          <>
                            {!assignment.draft && (
                              <>
                                {assignment.averageScore !== -1 ? (
                                  <ListItem
                                    button
                                    divider
                                    onClick={() =>
                                      history.push(
                                        "/studentpeerreviewresultsdisplay",
                                        {
                                          assignmentID: assignment.assignmentID,
                                        }
                                      )
                                    }
                                    secondaryAction={
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                      >
                                        <BsArrowRightCircle />
                                      </IconButton>
                                    }
                                  >
                                    <ListItemText
                                      primary={`${assignment.title}`}
                                    />
                                    <ListItemText primary={"Completed"} />
                                    <ListItemText
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                      primary={
                                        "Score: " + `${assignment.averageScore}`
                                      }
                                    />
                                  </ListItem>
                                ) : (
                                  <ListItem
                                    button
                                    divider
                                    disabled
                                    secondaryAction={
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                      >
                                        <BsArrowRightCircle />
                                      </IconButton>
                                    }
                                  >
                                    <ListItemText
                                      primary={`${assignment.title}`}
                                    />
                                    <ListItemText primary={"In process"} />
                                  </ListItem>
                                )}
                              </>
                            )}
                          </>
                        ))}
                      </CardContent>
                    </CustomizedCard>
                  </TabPanel>
                ))}
              </div>
            </>
          )}
        </>
      </CustomizedContainer>
    </div>
  );
}

export default StudentResultPage;
