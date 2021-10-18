import React, { useState } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Card from "@mui/material/Card";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import Container from "@mui/material/Container";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedRadios from "../../components/CustomizedRadios";
import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import { Grid } from "@mui/material";

function FilterAssignment() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          direction: "column",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          px: 2,
          cursor: "pointer",
          borderRadius: 10,
          color: "#000",
          fontWeight: "600",
          backgroundColor: "#ddd",
        }}
      >
        <div style={{ marginRight: "40px" }}>Filter Assignments</div>
        <CustomizedRadios></CustomizedRadios>
      </Box>
    </div>
  );
}

function CreateNewAssignmentButton() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          direction: "column",
          justifyContent: "space-between",
          width: "90%",
          overflow: "hidden",
          px: 2,
          py: 1,
          cursor: "pointer",
          borderRadius: 10,
          border: "1px solid red",
          color: "#000",
          fontWeight: "600",
          backgroundColor: "#ddd",
          "&:hover": {
            backgroundColor: "#aaa",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div>Create a New Assignment</div>
        <AddCircleOutlineIcon sx={{ color: "#000" }} />
      </Box>
    </div>
  );
}

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ProfessorCourse({ history }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={8}>
            <Typography
              style={{ fontWeight: "600" }}
              variant="h6"
              component="div"
            >
              Courses and Assignments
            </Typography>
          </Grid>
            <Grid item xs={2}>
              <CustomizedButtons type2 model={"add"}>Create Course</CustomizedButtons>
            </Grid>
            <Grid item xs={2}>
            <CustomizedButtons type1>View Student Info</CustomizedButtons>
          </Grid>
        </Grid>
        <Card sx={{ width: "100%", bgcolor: "#fff", borderRadius: "10px", marginTop: "15px" }}>
          <CustomizedTabs
            type1
            setValue={setValue}
            value={value}
          ></CustomizedTabs>
          <TabPanel value={value} index={0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CreateNewAssignmentButton></CreateNewAssignmentButton>
              <FilterAssignment></FilterAssignment>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Three
          </TabPanel>
        </Card>
      </Container>
    </div>
  );
}

export default ProfessorCourse;
