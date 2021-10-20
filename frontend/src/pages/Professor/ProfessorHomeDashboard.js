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
  Divider,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

import { BiCheckCircle } from "react-icons/bi";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import bg from "../../images/multi_background_dashboard.jpg";

// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedDivider from "../../components/CustomizedDivider";

function CourseBar() {
  return (
    <Stack spacing={0}>
      <CustomizedButtons type3 fullwidth model={"arrow"}>
        CRN, Section, Semester
      </CustomizedButtons>
      <List dense={true}>
        <ListItem>
          <ListItemText
            primary={
              <Typography component="span" fontWeight="600" variant="body2">
                Solution 1
              </Typography>
            }
          />
          <ListItemText primary="Due 10/13/21" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography component="span" fontWeight="600" variant="body2">
                Peer Review 1
              </Typography>
            }
          />
          <ListItemText primary="Due 10/13/21" />
        </ListItem>
      </List>
    </Stack>
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
      <CustomizedContainer>
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
                sx={{ paddingBottom: "0" }}
                title={
                  <List dense={true} sx={{ padding: "0", margin: "0" }}>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon
                          sx={{ color: "#0DC38D" }}
                          fontSize="medium"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            fontWeight="600"
                            variant="body1"
                          >
                            Assignments by Course
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                }
              ></CardHeader>
              <CardContent sx={{ paddingTop: "0" }}>
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
                    <List dense={true} sx={{ padding: "0", margin: "0" }}>
                      <ListItem
                        secondaryAction={
                          <CustomizedButtons type1>See All</CustomizedButtons>
                        }
                      >
                        <ListItemIcon>
                          <FiberManualRecordIcon
                            sx={{ color: "#0DC38D" }}
                            fontSize="medium"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              fontWeight="600"
                              variant="body1"
                            >
                              Results to Review
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  }
                ></CardHeader>
                <CustomizedDivider type1></CustomizedDivider>
                <CardContent sx={{ paddingTop: 0 }}>
                  <List>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <ListItemText primary="Final submissions completed on 10/05/21" />
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <BiCheckCircle size="1.5em"></BiCheckCircle>
                        </ListItemIcon>
                        <ListItemText primary="Peer Review" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <ListItemText primary="Final submissions completed on 10/05/21" />
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <BiCheckCircle size="1.5em"></BiCheckCircle>
                        </ListItemIcon>
                        <ListItemText primary="Peer Review" />
                      </ListItemButton>
                    </ListItem>
                  </List>
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
