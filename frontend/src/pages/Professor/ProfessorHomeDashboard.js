import React from "react";
// @mui components
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import Button from "../../components/Button";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";
import { primaryColor, fontColor } from "../../styles/Style";

function CourseBar() {
  return (
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
        color: "#ffffff",
        bgcolor: "#000000",
        fontWeight: "600",
        "&:hover": {
          backgroundColor: "#000000",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <div>CRN, Section, Semester</div>
      <ArrowCircleUpIcon
        sx={{ color: "#ffffff", transform: "rotate(90deg)" }}
      />
    </Box>
  );
}

function CreateNewCourseButton() {
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
          border: "1px solid #000",
          color: "#000",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "#ddd",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div>Create a New Course</div>
        <AddCircleOutlineIcon sx={{ color: "#000" }} />
      </Box>
    </div>
  );
}

function ReviewBar() {
  return (
    <Box
      sx={{
        display: "flex",
        direction: "column",
        justifyContent: "space-between",
        width: "95%",
        overflow: "hidden",
        px: 2,
        py: 1,
        cursor: "pointer",
        borderTop: "0.5px solid #aaa",
        color: "#00000",
        "&:hover": {
          backgroundColor: "#ddd",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Stack direction="row" spacing={1}>
        <div style={{fontWeight: "600"}}>CRN, Section, Semester</div>
        <div>Final submissions completed on 10/05/21</div>
      </Stack>

      <CheckCircleOutlinedIcon sx={{ color: "#00000" }} />
    </Box>
  );
}
function ProfessorHomeDashBoard() {
  return (
    <div>
      <NavBar fixed></NavBar>
      <div style={{ marginTop: "150px" }}></div>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Card sx={{ width: "30%", overflow: "hidden", p: 1 }}>
          <CardHeader
            title={
              <Typography
                style={{ fontWeight: "600" }}
                variant="h6"
                component="div"
              >
                View Courses
              </Typography>
            }
          ></CardHeader>
          <CardContent>
            <Stack spacing={2}>
              <CourseBar></CourseBar>
              <CourseBar></CourseBar>
              <CourseBar></CourseBar>
              <CourseBar></CourseBar>
              <CreateNewCourseButton></CreateNewCourseButton>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: "60%", overflow: "hidden", p: 1 }}>
          <CardHeader
            title={
              <Typography
                style={{ fontWeight: "600" }}
                variant="h6"
                component="div"
              >
                Results to Review
              </Typography>
            }
          ></CardHeader>
          <CardContent sx={{paddingTop: 0}}>
            <Stack>
              <ReviewBar></ReviewBar>
              <ReviewBar></ReviewBar>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ProfessorHomeDashBoard;
