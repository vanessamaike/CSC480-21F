import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
import { FcHighPriority } from "react-icons/fc";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
//PDF
import { Document, Page, pdfjs } from "react-pdf";
import PDFControlBar from "../../components/PDFhandling/PDFControlBar";
import viewPdf from "../../pdf/sample.pdf";

// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import {
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedTables from "../../components/CustomizedTables";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectCourses, getCoursesByUserId } from "../../features/coursesSlice";
import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";
const jsonData = [
  [
    "Team Name",
    "An98Wi00",
    "Br00Mi99",
    "Br99Da99",
    "Ch99Sa00",
    "Do99",
    "Na99Ma96",
    "Pa99mi99",
    "Po94Ch87",
    "AVERAGE"
  ],
  [
    "An98Wi00",
    "",
    "9",
    "",
    "7",
    "",
    "",
    "",
    "",
    "8"
  ],
  [
    "Br00Mi99",
    "",
    "",
    "",
    "12.5",
    "",
    "",
    "",
    "",
    "12.5"
  ],
  [
    "Br99Da99",
    "",
    "12",
    "",
    "",
    "",
    "",
    "",
    "",
    "12"
  ],
  [
    "Ch99Sa00",
    "17.75",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "17.75"
  ],
  [
    "Do99",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "Na99Ma96",
    "12.75",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "12.75"
  ],
  [
    "Pa99mi99",
    "12",
    "14",
    "",
    "",
    "",
    "",
    "",
    "",
    "13"
  ],
  [
    "Po94Ch97",
    "",
    "",
    "",
    "14.5",
    "",
    "",
    "",
    "",
    "14.5"
  ],
  [
    "AVERAGE",
    "14.16666667",
    "11.66666667",
    "",
    "11.33333333",
    "",
    "",
    "",
    "",
    ""
  ]
]
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

function StudentPeerReviewQualityCheckPage({ history }) {
  const [tab, setTab] = useState(0);
  //const [jsonData, setjsonData] = useState([]);
  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;
  const [openErrors, setOpenErrors] = React.useState(false);

  const handleClick = () => {
    setOpenErrors(!openErrors);
  };

  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // for submit event
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Student Dashboard</Typography>
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            Peer Review Results
          </Typography>
        </Breadcrumbs>
        <Grid
          container
          sx={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
          spacing={9}
        >
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
              Peer Review Quality Check
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <CustomizedButtons
              type1
              model={"checked"}
              onClick={() => {
                history.push("./courseresult");
              }}
            >
              Send for Reviews
            </CustomizedButtons>
          </Grid>
        </Grid>
        <div>
          <CustomizedCard style={{ marginBottom: "20px" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack>
                <Typography
                  style={{
                    display: "flex",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                  variant="body1"
                  component="div"
                >
                  Functional Requirements Modeling
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    textAlign: "center",
                  }}
                  variant="body2"
                  component="div"
                >
                  Submissions closed 11:59pm 10/7/21
                </Typography>
              </Stack>
              <CustomizedButtons type3 model={"download"}>
                Download Solutions
              </CustomizedButtons>
            </CardContent>
          </CustomizedCard>
          <CustomizedTabs
            type3
            setTab={setTab}
            value={tab}
            labels={["Outlier Display", "Peer Reviews"]}
          ></CustomizedTabs>
          <TabPanel value={tab} index={0}>
            <CustomizedCard>
              <CardContent>
                <List>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "20px",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="column" spacing={2}>
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                        variant="body1"
                        component="div"
                      >
                        Outlier Display
                      </Typography>
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                        }}
                        variant="body1"
                        component="div"
                      >
                        All reviews given and received, noted by team name.
                      </Typography>
                    </Stack>
                  </div>
                </List>
                {viewPdf && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CustomizedTables
                      jsonData={jsonData.slice(0, -1)}
                    ></CustomizedTables>
                  </div>
                )}
              </CardContent>
            </CustomizedCard>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <CustomizedCard>
              <CardContent>
                <List>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "20px",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" spacing={3}>
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                        variant="body1"
                        component="div"
                      >
                        Current Display Team Name
                      </Typography>
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                        }}
                        variant="body1"
                        component="div"
                      >
                        Submitted 10/06/21 at 12:00pm
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "130px",
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    >
                      <FcHighPriority size="1.5em" />
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                        variant="body2"
                        component="div"
                      >
                        View Errors
                      </Typography>
                      {openErrors === false ? (
                        <GoTriangleDown size="1em" />
                      ) : (
                        <GoTriangleUp size="1em" />
                      )}
                    </Stack>
                  </div>
                  <Collapse in={openErrors} timeout="auto" unmountOnExit>
                    <div
                      style={{
                        backgroundColor: "#F2F4F5",
                        borderRadius: "10px",
                        padding: "20px 20px 30px 30px",
                      }}
                    >
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                        variant="body1"
                        component="div"
                      >
                        Error Found
                      </Typography>
                      <List>
                        {[1, 2, 3, 4].map((key) => (
                          <ListItem key={key}>
                            <Typography
                              style={{
                                display: "flex",
                                textAlign: "center",
                              }}
                              variant="body2"
                              component="div"
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                      <Stack direction="row" spacing={3}>
                        <CustomizedButtons type1 height1>
                          Reupload PDF
                        </CustomizedButtons>
                        <CustomizedButtons type2 height1>
                          Reject PDF
                        </CustomizedButtons>
                      </Stack>
                    </div>
                  </Collapse>
                </List>
                {viewPdf && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Document
                      file={viewPdf}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} scale={scale} />
                    </Document>
                  </div>
                )}
              </CardContent>
            </CustomizedCard>
          </TabPanel>
        </div>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default StudentPeerReviewQualityCheckPage;
