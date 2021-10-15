import React, { useState } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Card from "@mui/material/Card";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { primaryColor, fontColor } from "../../styles/Style";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedRadios from "../../components/CustomizedRadios";

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
          py: 1,
          cursor: "pointer",
          borderRadius: 10,
          color: "#000",
          fontWeight: "600",
          backgroundColor: "#ddd",
        }}
      >
        <div style={{marginRight: "40px"}}>
          Filter Assignments
        </div>
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

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    // maxWidth: 40
    width: "100%",
    backgroundColor: "#347DEB",
    // borderRadius: "10px 10px 0 0",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(0.5),
    color: "#000",
    fontWeight: "600",
    zIndex: 1,
    outline: "none",
    // borderRadius: "10px 10px 0 0",
    backgroundColor: "rgba(207, 225, 255, 0.32)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function ProfessorCourse({ history }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <NavBar fixed history={history}></NavBar>
      <div style={{ marginTop: "150px" }}></div>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            style={{ fontWeight: "600" }}
            variant="h6"
            component="div"
          >
            Courses and Assignments
          </Typography>
          <CustomizedButtons type1 model="model2">
            ss
          </CustomizedButtons>
        </Box>
        <Card sx={{ width: "100%", bgcolor: "#fff", borderRadius: "10px" }}>
          <StyledTabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Course 1" />
            <StyledTab label="Course 2" />
            <StyledTab label="Course 3" />
            <StyledTab label="Course 4" />
          </StyledTabs>
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
