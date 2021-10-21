import React, { useState } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MdOutlineCancel } from "react-icons/md";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedRadios from "../../components/CustomizedRadios";
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
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";


const styles = theme => ({
  input: {
    height: 30,
    paddingTop: "5px"
  },
});

const  AddStudentBox = withStyles(styles)(props => {
  const { classes,handleAddStudent } = props;
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
          <ListItem sx={{display: "flex", justifyContent: "space-between"}}>
            <TextField
              sx={{ bgcolor: '#fff' }}
              label="Name"
              id="outlined-size-small"
              size="small"
              InputProps={{
                className: classes.input
              }}
            />
            <TextField
              sx={{ bgcolor: '#fff' }}
              label="Student ID"
              id="outlined-size-small"
              size= "small"
              InputProps={{
                className: classes.input
              }}
            />
            <TextField
              sx={{ bgcolor: '#fff' }}
              label="Email"
              id="outlined-size-small"
              size="small"
              InputProps={{
                className: classes.input
              }}
            />
            <CustomizedButtons type1 height1 onClick={handleAddStudent}>Add</CustomizedButtons>
          </ListItem>
        </ListItem>
      </List>
    </Box>
  );
})

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
  const [value, setValue] = useState(0);
  const [isOpenedAddStudentBox, setIsOpenedAddStudentBox] = useState(false);
  const handleAddStudent = () => {
    setIsOpenedAddStudentBox(false);
  }
  const handleOpenAddStudentBox = () => {
    setIsOpenedAddStudentBox(true);
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
            <CustomizedButtons type2 model={"add"}>
              <Link
                to="/coursecreation"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <div>Delete Course</div>
              </Link>
            </CustomizedButtons>
          </Grid>
        </Grid>
        <div>
          <CustomizedTabs
            type2
            setValue={setValue}
            value={value}
          ></CustomizedTabs>
          {[1, 2, 3, 4].map((id) => (
          <TabPanel value={value} index={id - 1}>
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
                          <CustomizedButtons
                            type3
                            model={"add"}
                            model={"switch"}
                          >
                            Student List
                          </CustomizedButtons>
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
                            Add new student
                          </CustomizedButtons>
                        </Grid>
                      </Grid>
                    ) : (
                      <AddStudentBox handleAddStudent={handleAddStudent}></AddStudentBox>
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
                  {[1, 2, 3].map((value) => (
                    <ListItem
                      button
                      divider
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
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
              </CardContent>
            </CustomizedCard>
          </TabPanel>
))}
        </div>
      </CustomizedContainer>
    </div>
  );
}

export default StudentInfoViewPage;
