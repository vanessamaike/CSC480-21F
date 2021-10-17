import React from "react";
// @mui components
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Container,
  Typography,
  Box,
  Stack,
} from "@mui/material";

import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import bg from '../../images/multi_background_dashboard.jpg'

// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

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
        color: "#000",
        bgcolor: "#F0F0F0",
        "&:hover": {
          backgroundColor: "#ccc",
        },
      }}
    >
      <Stack direction="row">
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
          }}
          variant="subtitle1"
          component="div"
        >
          CRN
        </Typography>
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
          }}
          variant="subtitle1"
          component="div"
        >
          , Section, Semester
        </Typography>
      </Stack>
      <ArrowCircleUpIcon sx={{ color: "#000", transform: "rotate(90deg)" }} />
    </Box>
  );
}

function ReviewBar() {
  return (
    <Box
      sx={{
        display: "flex",
        direction: "column",
        overflow: "hidden",
        p: 1,
        cursor: "pointer",
        color: "#00000",
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: "#ddd",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <CheckCircleOutlinedIcon sx={{ color: "#00000" }} />
      <Box
        sx={{
          display: "flex",
          flex: "1",
          justifyContent: "space-between",
          marginLeft: "10px",
        }}
      >
        <Typography
          style={{
            display: "flex",
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
          }}
          variant="subtitle1"
          component="div"
        >
          Peer Review 1
        </Typography>
        <Typography
          style={{ display: "flex", display: "flex", alignItems: "center" }}
          variant="h7"
          component="div"
        >
          Final submissions completed on 10/05/21
        </Typography>
      </Box>
    </Box>
  );
}

function ProfessorHomeDashBoard() {
  return (
    <div style ={{ backgroundImage:`url(${bg})`, height: "80vh", backgroundSize: "cover", paddingTop: "150px" }}
    >    
      <NavBar></NavBar>
      <div style={{ marginTop: "110px" }}></div>
      <Container maxWidth="lg" >
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                overflow: "hidden",
                p: 1,
                border: "3px solid #cfe1ff",
                borderRadius: "10px",
              }}
            >
              <CardHeader
                title={
                  <Stack direction="row">
                    <FiberManualRecordIcon
                      sx={{ color: "#347DEB" }}
                      fontSize="large"
                    ></FiberManualRecordIcon>
                    <Typography
                      style={{
                        display: "flex",
                        fontWeight: "600",
                        margin: "4px",
                      }}
                      variant="h6"
                      component="div"
                    >
                      Assignments by Course
                    </Typography>
                  </Stack>
                }
              ></CardHeader>
              <CardContent>
                <Stack spacing={2}>
                  <CourseBar></CourseBar>
                  <CourseBar></CourseBar>
                  <CourseBar></CourseBar>
                  <CourseBar></CourseBar>
                  <CourseBar></CourseBar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container spacing={3} xs={8}>
            <Grid item xs={12}>
              <Card
                variant="outlined"
                sx={{
                  overflow: "hidden",
                  p: 1,
                  border: "3px solid #cfe1ff",
                  borderRadius: "10px",
                }}
              >
                <CardHeader
                  sx={{ paddingBottom: "8px" }}
                  title={
                    <Stack
                      direction="row"
                      sx={{ borderBottom: "3px solid #cfe1ff" }}
                    >
                      <FiberManualRecordIcon
                        sx={{ color: "#0DC38D" }}
                        fontSize="large"
                      ></FiberManualRecordIcon>
                      <Typography
                        style={{
                          display: "flex",
                          fontWeight: "600",
                          margin: "4px",
                        }}
                        variant="h6"
                        component="div"
                      >
                        Results to Review
                      </Typography>
                    </Stack>
                  }
                ></CardHeader>
                <CardContent sx={{ paddingTop: 0 }}>
                  <Stack>
                    <ReviewBar></ReviewBar>
                    <ReviewBar></ReviewBar>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card
                variant="outlined"
                sx={{
                  overflow: "hidden",
                  p: 1,
                  border: "3px solid #cfe1ff",
                  borderRadius: "10px",
                }}
              >
                <CardHeader
                  title={
                    <Stack direction="row">
                      <FiberManualRecordIcon
                        sx={{ color: "#6F40DC" }}
                        fontSize="large"
                      ></FiberManualRecordIcon>
                      <Typography
                        style={{
                          display: "flex",
                          fontWeight: "600",
                          margin: "4px",
                        }}
                        variant="h6"
                        component="div"
                      >
                        Manage Students & Teams by Course
                      </Typography>
                    </Stack>
                  }
                ></CardHeader>
                <CardContent sx={{ paddingTop: 0 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <CustomizedButtons type2 fullwidth model={"type2"}>
                        Create a New Course
                      </CustomizedButtons>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomizedButtons type2 fullwidth model={"type2"}>
                        Create a New Course
                      </CustomizedButtons>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomizedButtons type2 fullwidth model={"type2"}>
                        Create a New Course
                      </CustomizedButtons>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomizedButtons type2 fullwidth model={"type2"}>
                        Create a New Course
                      </CustomizedButtons>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CustomizedButtons type1 model={"type1"}>
                Create a New Course
              </CustomizedButtons>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ProfessorHomeDashBoard;
