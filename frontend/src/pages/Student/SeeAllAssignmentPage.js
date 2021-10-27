import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

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

const demoData = [
  {
    name: "Peer Review 1",
    date: "10/07/21",
    type: "Completed",
    deadline: "Due 10/01/21",
  },
  {
    name: "Peer Review 2",
    date: "11/07/21",
    type: "Upcoming",
    deadline: "Due 10/01/21",
  },
  {
    name: "Peer Review 3",
    date: "13/07/21",
    type: "Upcoming",
    deadline: "Due 10/01/21",
  },
  {
    name: "Peer Review 4",
    date: "12/07/21",
    type: "Completed",
    deadline: "Due 10/01/21",
  },
];

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

function SeeAllAssignmentPage({ history }) {
  const [tab, setTab] = useState(0);
  const [filterType, setFilterType] = useState("All");
  const [items, setItems] = useState(demoData);
  useEffect(() => {
    console.log(filterType);
    const filteredItems = demoData.filter((item) => {
      return item.type == filterType || filterType === "All";
    });
    setItems(filteredItems);
  }, [filterType]);

  console.log(filterType);
  console.log(items);
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
              Assignments by Course
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Link
              to="/studentinfoview"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <CustomizedButtons type1>View Teams</CustomizedButtons>
            </Link>
          </Grid>
        </Grid>
        <div>
          <CustomizedTabs type1 setValue={setTab} value={tab}></CustomizedTabs>
          {[1, 2, 3, 4].map((id) => (
            <TabPanel value={tab} index={id - 1}>
              <CustomizedCard>
                <CardHeader
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  title={
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <CustomizedButtons
                          type3
                          model={"radio3"}
                          fullwidth
                          filterType={filterType}
                          setFilterType={setFilterType}
                        >
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
                  {items.map((item) => (
                    <Link
                      to="/resultviewer"
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      <ListItem
                        button
                        divider
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <BsArrowRightCircle />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={`${item.name}`} />
                        <>
                          {item.type === "Upcoming" ? (
                            <ListItemText
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                              primary={`${item.deadline}`}
                            />
                          ) : (
                            <ListItemText
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                              primary={`${item.type}`}
                            />
                          )}
                        </>
                      </ListItem>
                    </Link>
                  ))}
                </CardContent>
              </CustomizedCard>
            </TabPanel>
          ))}
        </div>
      </CustomizedContainer>
    </div>
  );
}

export default SeeAllAssignmentPage;
