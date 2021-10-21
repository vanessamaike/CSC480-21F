import React, { useState } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedRadios from "../../components/CustomizedRadios";
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
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";

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

function CourseResultPage({ history }) {
  const [value, setValue] = React.useState(0);

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
            setValue={setValue}
            value={value}
          ></CustomizedTabs>
          {[1, 2, 3, 4].map((id) => (
          <TabPanel value={value} index={id - 1}>
            <CustomizedCard>
              <CardHeader
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                title={
                  <Grid container>
                    <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end"}}>
                        <CustomizedButtons type3 model={"radio2"} fullwidth>
                          Filter Results
                        </CustomizedButtons>
                    </Grid>
                  </Grid>
                }
              ></CardHeader>
              <CardContent
                sx={{
                  paddingTop: "0",
                }}
              >
                {[1, 2, 3].map((num) => (
                  <ListItem
                    button
                    divider
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <BsArrowRightCircle />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`Peer Review ${num}`} />
                    <ListItemText
                      sx={{ display: "flex", justifyContent: "center" }}
                      primary="Student submissions completed 10/01/21"
                    />
                    <ListItemText
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      primary="Complete"
                    />
                  </ListItem>
                ))}
              </CardContent>
            </CustomizedCard>
          </TabPanel>))
}
        </div>
      </CustomizedContainer>
    </div>
  );
}

export default CourseResultPage;
