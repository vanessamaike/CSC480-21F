import React from "react";
// @mui components
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
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
function ReviewBar() {
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
  )
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
        <Card sx={{ width: "30%", overflow: "hidden" }}>
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
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: "60%", overflow: "hidden" }}><CardHeader
            title={
              <Typography
                style={{ fontWeight: "600" }}
                variant="h6"
                component="div"
              >
                Results to Review
              </Typography>
            }
          ></CardHeader></Card>
      </Container>
    </div>
  );
}

export default ProfessorHomeDashBoard;
