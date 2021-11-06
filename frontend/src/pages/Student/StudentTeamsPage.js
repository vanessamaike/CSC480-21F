import React, { useState } from "react";
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
  Breadcrumbs
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";

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
      <Breadcrumbs aria-label="breadcrumb" mb={5}>
          <Typography color="text.primary">Home</Typography>
          <Typography color="text.primary">Courses</Typography>
          <Typography color="text.primary">Students & Teams</Typography>
        </Breadcrumbs>
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
          <CustomizedTabs type2 setValue={setTab} value={tab}></CustomizedTabs>
          {[1, 2, 3, 4].map((id) => (
            <TabPanel value={tab} index={id - 1}>
              <CustomizedCard>
                <CardHeader
                  sx={{
                    paddingBottom: "0",
                  }}
                  title={
                    <>
                    <Grid container>
                        <Grid item xs={9}> 
                            <div></div>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <CustomizedButtons
                              type3
                              model={"add"}
                              onClick={handleOpenAddStudentBox}
                            >
                              Add Teammate
                            </CustomizedButtons>
                          </Grid>
                    </Grid>   
                    </>
                  }
                ></CardHeader>
                <CardContent
                  sx={{
                    paddingTop: "0",
                  }}
                >
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem
                          button
                          divider
                          
                        >
                          <ListItemText primary="Team Name" />
                          <ListItemText
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                            primary="3 team members"
                          />

                        </ListItem>
                        
                      <Collapse in={true} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <>
                        {[1, 2, 3].map((value, key) => (
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
                                  <ListItemText primary={`Student ${value} Name`} />
                                </ListItem>
                        ))}</>
                        </List>
                      </Collapse>
                    </List>
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

export default StudentTeamsPage;
