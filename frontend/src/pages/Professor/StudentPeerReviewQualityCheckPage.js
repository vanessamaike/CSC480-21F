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
import viewPdf from "../../pdf/sample.pdf";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import { handleConvertByteArrayToPdf } from "../../utils/byteArrayToPDF";
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
  Tabs,
  Tab,
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedTables from "../../components/CustomizedTables";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";
import {
  getQualityCheckPeerReviewByProfesssor,
  sendFeedBackByProfessor,
  rejectPeerReviewByProfessor,
  postNewPeerReviewByStudent,
} from "../../axios/APIRequests";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { GrDocumentMissing } from "react-icons/gr";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
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

function StudentPeerReviewQualityCheckPage({ history, location }) {
  const [tab, setTab] = useState(0);
  const [teamTab, setTeamTab] = useState(0);
  const [submissionTab, setSubmissionTab] = useState(0);
  //const [jsonData, setjsonData] = useState([]);
  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const [linkDownload, setLinkDownload] = useState();
  const [openErrors, setOpenErrors] = React.useState(false);
  const [assignment, setAssignment] = useState();
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  const [teamKeys, setTeamKeys] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submissionPdfFile, setSubmissionPdfFile] = useState();
  const [peerReviewPdfFileName, setPeerReviewPdfFileName] = useState("");
  const [submissionArray, setSubmissionArray] = useState([]);
  const handleClick = () => {
    setOpenErrors(!openErrors);
  };
  const handleChangeTeamTab = (event, newValue) => {
    setTeamTab(newValue);
  };
  const handleChangeSubmissionTab = (event, newValue) => {
    setSubmissionTab(newValue);
  };
  useEffect(() => {
    if (location.state.assignmentID == undefined) return;
    var assignmentID = location.state.assignmentID;
    console.log(assignmentID);
    getQualityCheckPeerReviewByProfesssor(assignmentID)
      .then((value) => {
        console.log(value);
        setAssignment(value);
        if (value !== undefined) {
          setLoading(false);
        }
        console.log(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (assignment !== undefined) {
      if (assignment.teams[teamTab].peerReview[submissionTab] !== undefined) {
        console.log(assignment.teams[teamTab].peerReview[submissionTab].pdfDoc);
        setLinkDownload(
          handleConvertByteArrayToPdf(
            assignment.teams[teamTab].peerReview[submissionTab].pdfDoc
          )
        );
      }
    }
  }, [assignment, teamTab, submissionTab]);
  // for submit event
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const handleExpand = (key) => () => {
    setTeamKeys({ [key]: !teamKeys[key] });
  };
  const handleSendForFeedBack = () => {
    sendFeedBackByProfessor(assignment.assignmentID)
      .then(function (response) {
        console.log(response);
        history.push("./courseresult");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleReupload = (teamId) => {
    // var newSubArray = [];
    // if (submissionPdfFile.length === 0) {
    //   alert("Please upload your pdf file before submitting !!!");
    // } else {
    //     var newSubmission = {
    //       teamID: teamId,
    //       assignmentID: peerReviewInfo.assignmentID,
    //       pdfDoc: submission.pdfDoc,
    //       score: submission.score,
    //       submissionID: peerReviewInfo.teams[index].submission.submissionID,
    //     };
    //     newSubArray.push(newSubmission);
    //   const json = JSON.stringify(newSubArray);
    //   console.log(newSubArray);
    //   postNewPeerReviewByStudent(newSubArray)
    //     .then(function (response) {
    //       console.log(response);
    //       history.push("/seeallassignment");
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }
  };
  const handleReject = (teamID) => {
    console.log(teamID);
    rejectPeerReviewByProfessor(assignment.assignmentID, teamID)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
                  Peer Review Quality Check
                </Typography>
                <CustomizedButtons
                  type1
                  model={"checked"}
                  onClick={handleSendForFeedBack}
                >
                  Send Feedback
                </CustomizedButtons>
              </Stack>
              <Stack>
                <CustomizedCard style={{ marginBottom: "20px" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                        {`${assignment.title} Peer Review`}
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
                          assignment.peerReviewDueDateTime
                        ).toLocaleString()}`}
                      </Typography>
                    </Stack>
                    <CustomizedButtons
                      type3
                      model={"download"}
                      href={viewPdf}
                      download={"PeerReviewInstructor.pdf"}
                    >
                      Download Peer Review Instruction
                    </CustomizedButtons>
                  </CardContent>
                </CustomizedCard>
                <Stack direction="row" alignItems="flex-start">
                  <Stack sx={{ flex: 1 }}>
                    <CustomizedTabs
                      type3
                      setTab={setTab}
                      value={tab}
                      labels={["Distributions", "Peer Reviews"]}
                    ></CustomizedTabs>
                    <TabPanel value={tab} index={0}>
                      <CustomizedCard>
                        <CardContent>
                          <Stack
                            direction="column"
                            mb={1}
                            justifyContent="space-between"
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
                              View each team's average score. Expand a team to
                              view each peer review score received.
                            </Typography>
                            <List component="nav">
                              {assignment.outlier.map((team, key) => {
                                const open = teamKeys[key] || false;
                                return (
                                  <div key={key}>
                                    <ListItem
                                      button
                                      divider
                                      secondaryAction={
                                        <>
                                          {team.peerReview.length === 0 ? (
                                            <BsFillFileEarmarkExcelFill
                                              style={{ color: "red" }}
                                            />
                                          ) : (
                                            <IconButton
                                              edge="end"
                                              aria-label="delete"
                                            >
                                              {open ? (
                                                <IoIosArrowDropup />
                                              ) : (
                                                <IoIosArrowDropdown />
                                              )}
                                            </IconButton>
                                          )}
                                        </>
                                      }
                                      onClick={handleExpand(key)}
                                    >
                                      <ListItemText
                                        sx={{ fontWeight: "600" }}
                                        primary={`Team ${team.teamName}`}
                                      />
                                      <>
                                        {team.peerReview.length === 0 ? (
                                          <ListItemText
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
                                            primary={`This team has not submit the solution
                                          `}
                                          />
                                        ) : (
                                          <>
                                            {team.averageScore === -1 ? (
                                              <ListItemText
                                                sx={{
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                                }}
                                                primary={`No team reviews the solution of this team
                                          `}
                                              />
                                            ) : (
                                              <ListItemText
                                                sx={{
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                                }}
                                                primary={`Average Score: ${Math.round(
                                                  team.averageScore
                                                )}`}
                                              />
                                            )}
                                          </>
                                        )}
                                      </>
                                    </ListItem>

                                    <Collapse
                                      in={open}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <List component="div" disablePadding>
                                        <>
                                          {team.peerReview.map(
                                            (review, key) => (
                                              <ListItem
                                                key={key}
                                                button
                                                sx={{ pl: 4 }}
                                                divider
                                              >
                                                <ListItemText
                                                  primary={`Team ${review.teamName}`}
                                                />
                                                <>
                                                  {review.score ===
                                                  undefined ? (
                                                    <ListItemText
                                                      sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "flex-end",
                                                      }}
                                                      primary={`In Process`}
                                                    />
                                                  ) : (
                                                    <ListItemText
                                                      sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                          "flex-end",
                                                      }}
                                                      primary={`Score: ${review.score}`}
                                                    />
                                                  )}
                                                </>
                                              </ListItem>
                                            )
                                          )}
                                        </>
                                      </List>
                                    </Collapse>
                                  </div>
                                );
                              })}
                            </List>
                          </Stack>
                        </CardContent>
                      </CustomizedCard>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                      <CustomizedCard>
                        <CardContent>
                          {assignment.teams.map((team, key) => {
                            return (
                              <TabPanel value={teamTab} index={key}>
                                {team.peerReview.length !== 0 ? (
                                  <Stack
                                    direction="column"
                                    alignItems="center"
                                    spacing={4}
                                  >
                                    <Tabs
                                      value={submissionTab}
                                      onChange={handleChangeSubmissionTab}
                                      variant="scrollable"
                                      scrollButtons
                                      allowScrollButtonsMobile
                                    >
                                      {team.peerReview.map(
                                        (peerreview, key) => (
                                          <Tab
                                            label={`Peer Review ${key + 1}`}
                                          />
                                        )
                                      )}
                                    </Tabs>
                                    {team.peerReview.map((peerreview, key2) => {
                                      return (
                                        <TabPanel
                                          value={submissionTab}
                                          index={key2}
                                        >
                                          <Stack
                                            sx={{ flex: 1 }}
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="space-between"
                                          >
                                            <Stack
                                              direction="column"
                                              spacing={1}
                                            >
                                              <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                              >
                                                <Stack
                                                  direction="column"
                                                  spacing={1}
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
                                                    {`Team ${team.teamName} Review of Team ${peerreview.solutionTeamName}`}
                                                  </Typography>
                                                  <Typography
                                                    style={{
                                                      display: "flex",
                                                      textAlign: "center",
                                                    }}
                                                    variant="body1"
                                                    component="div"
                                                  >
                                                    {`Submitted at ${new Date(
                                                      peerreview.submissionTime
                                                    ).toLocaleString()}`}
                                                  </Typography>
                                                </Stack>
                                                <Stack
                                                  direction="column"
                                                  alignItems="flex-end"
                                                  spacing={1}
                                                >
                                                  <CustomizedButtons
                                                    type3
                                                    height1
                                                    model={"download"}
                                                    href={linkDownload}
                                                    download={"PeerReview.pdf"}
                                                  >
                                                    Download Peer Review
                                                  </CustomizedButtons>
                                                  <Stack
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      justifyContent:
                                                        "space-between",
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
                                                    padding:
                                                      "20px 20px 30px 30px",
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
                                                    {peerreview.listOfQCWordViolations
                                                      .split(",")
                                                      .map((word, key) => (
                                                        <ListItem key={key}>
                                                          <Typography
                                                            style={{
                                                              display: "flex",
                                                              textAlign:
                                                                "center",
                                                            }}
                                                            variant="body2"
                                                            component="div"
                                                          >
                                                            {word}
                                                          </Typography>
                                                        </ListItem>
                                                      ))}
                                                  </List>
                                                  <Stack
                                                    direction="row"
                                                    spacing={3}
                                                  >
                                                    {/* {submissionPdfFile !==
                                                      undefined && (
                                                      <CustomizedButtons
                                                        type1
                                                        height1
                                                        onClick={() => {
                                                          handleReupload(
                                                            team.teamID
                                                          );
                                                        }}
                                                      >
                                                        Submit
                                                      </CustomizedButtons>
                                                    )}
                                                    <CustomizedPdfUploader
                                                      id="submission"
                                                      value={submissionPdfFile}
                                                      setPdfFile={
                                                        setSubmissionPdfFile
                                                      }
                                                      pdfFileName={
                                                        peerReviewPdfFileName
                                                      }
                                                      setPdfFileName={
                                                        setPeerReviewPdfFileName
                                                      }
                                                    ></CustomizedPdfUploader> */}
                                                    <CustomizedButtons
                                                      type2
                                                      height1
                                                      onClick={() => {
                                                        handleReject(
                                                          team.teamID
                                                        );
                                                      }}
                                                    >
                                                      Reject PDF
                                                    </CustomizedButtons>
                                                  </Stack>
                                                </div>
                                              </Collapse>
                                            </Stack>
                                            {peerreview.pdfDoc && (
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
                                                  file={{
                                                    data: peerreview.pdfDoc,
                                                  }}
                                                  onLoadSuccess={
                                                    onDocumentLoadSuccess
                                                  }
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
                                          </Stack>
                                        </TabPanel>
                                      );
                                    })}
                                  </Stack>
                                ) : (
                                  <Stack
                                    sx={{ height: "100%", flex: 1 }}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    This team has not submitted Peer Review yet.
                                  </Stack>
                                )}
                              </TabPanel>
                            );
                          })}
                        </CardContent>
                      </CustomizedCard>
                    </TabPanel>
                  </Stack>
                  {tab !== 0 && (
                    <CustomizedCard
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "250px",
                        marginLeft: "20px",
                        marginTop: "47px",
                        justifyContent: "center",
                      }}
                    >
                      <Tabs
                        value={teamTab}
                        orientation="vertical"
                        onChange={handleChangeTeamTab}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                      >
                        {assignment.teams.map((team, key) => (
                          <Tab label={`Team ${team.teamName}`} />
                        ))}
                      </Tabs>
                    </CustomizedCard>
                  )}
                </Stack>
              </Stack>
            </>
          )}
        </>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default StudentPeerReviewQualityCheckPage;
