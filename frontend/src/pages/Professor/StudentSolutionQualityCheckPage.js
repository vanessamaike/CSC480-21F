import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";
import { getQualityCheckSolutionByProfessor, rejectSolutionByProfessor, sendReviewByProfessor,postNewSolutionByStudent } from "../../axios/APIRequests";
import { handleConvertByteArrayToPdf } from "../../utils/byteArrayToPDF";
import CustomizedPdfUploader from "../../components/CustomizedPdfUploader";

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

function StudentSolutionQualityCheckPage({ history, location }) {
  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;
  const [openErrors, setOpenErrors] = React.useState(false);
  const [submissionPdfFile, setSubmissionPdfFile] = useState();
  const [solutionPdfFileName, setSolutionPdfFileName] = useState("");
  const handleClick = () => {
    setOpenErrors(!openErrors);
  };
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  const [tab, setTab] = React.useState(0);
  const [assignment, setAssignment] = useState();
  const [linkDownload, setLinkDownload] = useState();
  const [submittedTeam, setSubmittedTeam] = useState(0)
  const [totalTeam, setTotalTeam] = useState(0)

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const [loading, setLoading] = useState(true);
  // for submit event
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const handleGetQualityCheckSolutionByProfessor = (assignmentID) => {
    getQualityCheckSolutionByProfessor(assignmentID)
    .then((value) => {
      console.log(value);
      setAssignment(value);
      if (value !== undefined) {
        setLoading(false);
        setSubmittedTeam(value.teams.filter((team) => team.submission !== undefined).length)
        setTotalTeam(value.teams.length)
      }
      console.log(value);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    if (location.state.assignmentID == undefined) return;
    var assignmentID = location.state.assignmentID;
    console.log(assignmentID);
    handleGetQualityCheckSolutionByProfessor(assignmentID)
  }, []);
  useEffect(() => {
    if(assignment === undefined) return
    if(assignment.teams[tab].submission !== undefined){
      setLinkDownload(handleConvertByteArrayToPdf(assignment.teams[tab].submission.pdfDoc));
    }
  }, [tab])
  const handleSendForReview = () => {
    sendReviewByProfessor(assignment.assignmentID)
    .then(function (response) {
      console.log(response);
      history.push("./courseresult");
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  const handleReupload = (teamId) => {
    if (submissionPdfFile.length === 0) {
      alert("Please upload your pdf file before submitting !!!")
    } else {
      var newSubmission = {
        teamID: teamId,
        pdfDoc: submissionPdfFile,
        seen: false,
        assignmentID: assignment.assignmentID,
      };

      const json = JSON.stringify(newSubmission);
      console.log(newSubmission);
      postNewSolutionByStudent(newSubmission)
        .then(function (response) {
          console.log(response);
          var assignmentID = location.state.assignmentID;
          setSubmissionPdfFile()
          setSolutionPdfFileName("")
          handleGetQualityCheckSolutionByProfessor(assignmentID)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  const handleReject = (teamID) => {
    console.log(teamID);
    rejectSolutionByProfessor(assignment.assignmentID,teamID)
    .then(function (response) {
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
          <Typography color="text.primary">Student Dashboard</Typography>
          <Typography color="text.primary" style={{ fontWeight: "600" }}>
            Solution Results
          </Typography>
        </Breadcrumbs>
        <>
          {loading === true ? (
            <Loading />
          ) : (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography
                  style={{
                    display: "flex",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                  variant="h6"
                  component="div"
                >
                  Solution Quality Check
                </Typography>
                <CustomizedButtons
                  type1
                  model={"checked"}
                  onClick={handleSendForReview}
                >
                  Send for Reviews
                </CustomizedButtons>
              </Stack>
              <div>
                <CustomizedCard>
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
                        {`${assignment.title} Solution`}
                      </Typography>
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                        }}
                        variant="body2"
                        component="div"
                      >
                        {`Submissions closed ${new Date(
                          assignment.solutionDueDateTime
                        ).toLocaleString()}`}
                      </Typography>
                    </Stack>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                        variant="body2"
                        component="div"
                      >
                        {`${submittedTeam} out of ${totalTeam} teams submitted`}
                      </Typography>
                    </div>
                  </CardContent>
                </CustomizedCard>
                <Stack direction="row" justifyContent="space-between" mt={3}>
                  {assignment.teams.map((team, key) => {
                    return (
                      <TabPanel value={tab} index={key} style={{ flex: 1 }}>
                        <CustomizedCard>
                          {team.submission !== undefined ? (
                            <CardContent>
                              <Stack direction="column">
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  mb={2}
                                >
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      style={{
                                        display: "flex",
                                        textAlign: "center",
                                        fontWeight: "600",
                                      }}
                                      variant="body1"
                                      component="div"
                                    >
                                      {`Team ${team.teamName}`}
                                    </Typography>
                                    <Typography
                                      style={{
                                        display: "flex",
                                        textAlign: "center",
                                      }}
                                      variant="body1"
                                      component="div"
                                    >
                                      Submitted at{" "}
                                      {new Date(
                                        team.submission.submissionTime
                                      ).toLocaleString()}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction="column"
                                    spacing={1}
                                    alignItems="flex-end"
                                  >
                                    <CustomizedButtons
                                      type3
                                      model={"download"}
                                      href={linkDownload}
                                      download={"Solution.pdf"}
                                    >
                                      Download Solutions
                                    </CustomizedButtons>
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
                                  </Stack>
                                </Stack>
                                <Collapse
                                  in={openErrors}
                                  timeout="auto"
                                  unmountOnExit
                                >
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
                                      {team.submission.listOfQCWordViolations
                                        .split(",")
                                        .map((word, key) => (
                                          <ListItem key={key}>
                                            <Typography
                                              style={{
                                                display: "flex",
                                                textAlign: "center",
                                              }}
                                              variant="body2"
                                              component="div"
                                            >
                                              {word}
                                            </Typography>
                                          </ListItem>
                                        ))}
                                    </List>
                                    <Stack direction="row" spacing={3}>
                                      {submissionPdfFile !== undefined && (
                                        <CustomizedButtons
                                        type1
                                        height1
                                        onClick={() => {
                                          handleReupload(team.teamID);
                                        }}
                                      >
                                        Submit
                                      </CustomizedButtons>
                                      )}
                                      <CustomizedPdfUploader
                                        id="submission"
                                        value={submissionPdfFile}
                                        setPdfFile={setSubmissionPdfFile}
                                        pdfFileName={solutionPdfFileName}
                                        setPdfFileName={setSolutionPdfFileName}
                                      ></CustomizedPdfUploader>
                                      <CustomizedButtons
                                        type2
                                        height1
                                        onClick={() => {
                                          handleReject(team.teamID);
                                        }}
                                      >
                                        Reject PDF
                                      </CustomizedButtons>
                                    </Stack>
                                  </div>
                                </Collapse>
                              </Stack>
                              {team.submission.pdfDoc && (
                                <Stack
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  p={1}
                                  height={825}
                                >
                                  <CustomizedButtons
                                    model={"arrowL"}
                                    style={{
                                      color: "black",
                                      marginBottom: "10px",
                                    }}
                                    onClick={goToPreviousPage}
                                  ></CustomizedButtons>
                                  <Document
                                    file={{ data: team.submission.pdfDoc }}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                  >
                                    <Page
                                      pageNumber={pageNumber}
                                      scale={scale}
                                    />
                                  </Document>
                                  <CustomizedButtons
                                    model={"arrow"}
                                    style={{
                                      color: "black",
                                      marginBottom: "10px",
                                    }}
                                    onClick={goToNextPage}
                                  ></CustomizedButtons>
                                </Stack>
                              )}
                            </CardContent>
                          ) : (
                            <CardContent>
                              <List>
                                <div
                                  style={{
                                    display: "flex",
                                    marginBottom: "20px",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Stack direction="row" spacing={1}>
                                    <Typography
                                      style={{
                                        display: "flex",
                                        textAlign: "center",
                                        fontWeight: "600",
                                      }}
                                      variant="body1"
                                      component="div"
                                    >
                                      {`Team ${team.teamName}`}
                                    </Typography>
                                  </Stack>
                                  <Typography
                                    style={{
                                      display: "flex",
                                      textAlign: "center",
                                      fontWeight: "400",
                                    }}
                                    variant="body1"
                                    component="div"
                                  >
                                    This team has not submitted their solution
                                    yet !!!
                                  </Typography>
                                </div>
                              </List>
                            </CardContent>
                          )}
                        </CustomizedCard>
                      </TabPanel>
                    );
                  })}
                  <CustomizedCard
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "250px",
                      marginLeft: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <Tabs
                      value={tab}
                      orientation="vertical"
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                    >
                      {assignment.teams.map((team, key) => (
                        <Tab label={`Team ${team.teamName}`} />
                      ))}
                    </Tabs>
                  </CustomizedCard>
                </Stack>
              </div>
            </>
          )}
        </>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default StudentSolutionQualityCheckPage;
