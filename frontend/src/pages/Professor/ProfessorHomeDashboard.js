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

import { BiCheckCircle } from "react-icons/bi";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import bg from "../../images/multi_background_dashboard.jpg";

// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedCard from "../../components/CustomizedCard";

function CourseBar() {
  return (
    <Stack spacing={1}>
        <CustomizedButtons type3 fullwidth model={"arrow"}>
          CRN, Section, Semester
        </CustomizedButtons>
        <Stack sx={{ px: 2, py: 0 }} spacing={2} direction="row">
          <Typography
            style={{
              fontWeight: "600",
            }}
            variant="body1"
            component="div"
          >
            Solution 1
          </Typography>
          <Typography
            variant="body1"
            component="div"
          >
            Due 10/15/21
          </Typography>
        </Stack>
        <Stack sx={{ px: 2, py: 0 }} spacing={2} direction="row">
        <Typography
            style={{
              fontWeight: "600",
            }}
            variant="body1"
            component="div"
          >
            Peer Review 3
          </Typography>
          <Typography
            variant="body1"
            component="div"
          >
            Due 10/15/21
          </Typography>
        </Stack>
    </Stack>
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
      <BiCheckCircle size="1.5em" style={{ color: "#00000" }} />
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
            fontWeight: "600",
          }}
          variant="body1"
          component="div"
        >
          Peer Review 1
        </Typography>
        <Typography
          variant="body1"
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
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: "80vh",
        backgroundSize: "cover",
        paddingTop: "150px",
      }}
    >
      <NavBar></NavBar>
      <CustomizedContainer >
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <CustomizedCard>
              <CardHeader
                sx={{paddingBottom: "0"}}
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
                </Stack>
              </CardContent>
            </CustomizedCard>
          </Grid>
          <Grid item container spacing={3} xs={8}>
            <Grid item xs={12}>
              <CustomizedCard>
                <CardHeader
                  sx={{ paddingBottom: "8px" }}
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
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
                      <CustomizedButtons type1>See All</CustomizedButtons>
                    </Box>
                  }
                ></CardHeader>
                <CardContent sx={{ paddingTop: 0 }}>
                  <Stack>
                    <ReviewBar></ReviewBar>
                    <ReviewBar></ReviewBar>
                  </Stack>
                </CardContent>
              </CustomizedCard>
            </Grid>
            <Grid item xs={12}>
              <CustomizedCard>
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
                      <CustomizedButtons type2 fullwidth model={"arrow"}>
                        Create a New Course
                      </CustomizedButtons>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomizedButtons type2 fullwidth model={"arrow"}>
                        Create a New Course
                      </CustomizedButtons>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomizedButtons type2 fullwidth model={"arrow"}>
                        Create a New Course
                      </CustomizedButtons>
                    </Grid>
                    <Grid item xs={6}>
                      <CustomizedButtons type2 fullwidth model={"arrow"}>
                        Create a New Course
                      </CustomizedButtons>
                    </Grid>
                  </Grid>
                </CardContent>
              </CustomizedCard>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <CustomizedButtons type1 model={"add"}>
                Create a New Course
              </CustomizedButtons>
            </Grid>
          </Grid>
        </Grid>
      </CustomizedContainer>
    </div>
  );
}

export default ProfessorHomeDashBoard;
