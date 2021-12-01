import React, { useState, useEffect } from "react";
// @mui components
import Typography from "@mui/material/Typography";
//PDF
import { Document, Page, pdfjs } from "react-pdf";

// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

import bg from "../../images/multi_background_dashboard.jpg";
import { CardContent, FormControl, Grid, InputLabel, List, MenuItem, Select, Stack, Tab, Tabs } from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/Loading";
import CustomizedPdfUploader from "../../components/CustomizedPdfUploader";
import CustomizedBody from "../../components/CustomizedBody";
import CustomizedTextField from "../../components/CustomizedTextField";
import { handleConvertByteArrayToPdf } from "../../utils/byteArrayToPDF";
import { Box } from "@mui/system";
import { getSubmissionsToReviewByStudent,getTeamIdByStudentAndCourse,postNewPeerReviewByStudent,postNewSolutionByStudent} from "../../axios/APIRequests";

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

function PeerReviewAssignmentView({ history, location }) {
  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;

  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  const [tab, setTab] = useState(0);
  // ========= main variable =======
  const [score, setScore] = useState();
  const [teamId, setTeamId] = useState(); 
  const [peerReviewInfo, setPeerReviewInfo] = useState();
  const [submissionPdfFile, setSubmissionPdfFile] = useState();
  const [submissionPdfFileName, setSubmissionPdfFileName] = useState("");
  const [submissionArray, setSubmissionArray] = useState([]);
  const [linkDownload, setLinkDownload] = useState(); //this is peer review instuction pdf
  const [submissionLinkDownload, setSubmissionLinkDownload] = useState(); //this is solution submssion pdf
  var ErrorMessage = "Please fill out !!!";
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleChangeScore = (event) => {
    setScore(event.target.value);
    submissionArray[tab].score = event.target.value;
  };
  useEffect(() => {
    if (location.state.assignmentID == undefined) return;
    var assignmentID = location.state.assignmentID;
    getSubmissionsToReviewByStudent(assignmentID)
      .then((value) => {
        console.log(value)
        if (value !== undefined) {
          setPeerReviewInfo(value);
          let subArray = [];
        //initialize submission array
        value.teams.map((index) => {
          let sub = {
            pdfDoc: [],
            fileName: "",
            score: 0,
          };
          subArray.push(sub);
        });
          setSubmissionArray(subArray);
          setLoading(false);
          getTeamIdByStudentAndCourse(value.courseID)
          .then((value) => {
            setTeamId(value.teamID);
          })
          .catch((err) => {
            console.log(err);
          });
          
          if (value !== undefined) {
            setLinkDownload(handleConvertByteArrayToPdf(value.peerReviewPdfDoc));
          }
        } 
      })
      .catch((err) => {
        console.log(err);
      });
     
  }, []);

  console.log(submissionArray)
  useEffect(() => {
    if (peerReviewInfo !== undefined) {
      setSubmissionLinkDownload(
        handleConvertByteArrayToPdf(peerReviewInfo.teams[tab].submission.pdfDoc)
      );
      setScore(submissionArray[tab].score);
      setSubmissionPdfFileName(submissionArray[tab].fileName)
    }
  }, [tab]);

  useEffect(() => {
    console.log(submissionArray);
    if (submissionArray.length === 0) return;

    submissionArray[tab].pdfDoc = submissionPdfFile;
    submissionArray[tab].fileName = submissionPdfFileName
  }, [submissionPdfFile]);
  
  //======= handle send request to backend =====
  const handleSubmitFile = (event) => {
    var newSubArray = []
    if (submissionPdfFile.length === 0) {
      alert(ErrorMessage);
    } else {
      submissionArray.map((submission,index) => {
        var newSubmission = {
          teamID: teamId,
          assignmentID: peerReviewInfo.assignmentID,
          pdfDoc: submission.pdfDoc,
          score: submission.score,
          submissionID: peerReviewInfo.teams[index].submission.submissionID,
        };
        newSubArray.push(newSubmission)
      });
      const json = JSON.stringify(newSubArray);
      console.log(newSubArray);
      postNewPeerReviewByStudent(newSubArray)
        .then(function (response) {
          console.log(response);
           history.push("/seeallassignment");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

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

  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <CustomizedContainer>
            <Grid
              container
              sx={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
              }}
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
                  {`${peerReviewInfo.title} Peer Review`}
                </Typography>
              </Grid>
            </Grid>
            <div>
              <CustomizedCard style={{ margin: "20px 0"  }}>
                <CardContent>
                  <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
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
                        Due Date:
                      </Typography>
                      <Typography
                        style={{
                          display: "flex",
                          textAlign: "center",
                        }}
                        variant="body1"
                        component="div"
                      >
                        {new Date(
                          peerReviewInfo.peerReviewDueDateTime
                        ).toLocaleString()}
                      </Typography>
                    </Stack>
                    <CustomizedButtons
                      type3
                      model={"download"}
                      href={linkDownload}
                      download={"PeerReviewInstructor.pdf"}
                      title="download"
                    >
                      Download Instructions
                    </CustomizedButtons>
                  </Stack>
                </CardContent>
              </CustomizedCard>
              {peerReviewInfo.teams.length !== 0 ? (

                <Stack direction="row" justifyContent="space-between" style={{flex:"1"}}>
                  {peerReviewInfo.teams.map((team, key) => {
                    return (
                      <TabPanel value={tab} index={key} style={{ flex:1}}>
                        <CustomizedCard >
                          <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center"
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
                                  {`Submission ${key + 1}`}
                                </Typography>
                              </Stack>
                              <CustomizedButtons
                                type2
                                model={"download"}
                                href={submissionLinkDownload}
                                download={"Solution.pdf"}
                              >
                                Download Peer Review PDF
                              </CustomizedButtons>
                            </Stack>
                            {team.submission.pdfDoc && (
                              <Stack direction="row" justifyContent="center" alignItems="center" p={1} height={825}
                              >
                                <CustomizedButtons
                                  model={"arrowL"}
                                  style={{ color: "black", marginBottom: "10px" }}
                                  onClick={goToPreviousPage}
                                ></CustomizedButtons>
                                <Document
                                  file={{ data: team.submission.pdfDoc }}
                                  onLoadSuccess={onDocumentLoadSuccess}
                                >
                                  <Page pageNumber={pageNumber} scale={scale} />
                                </Document>
                                <CustomizedButtons
                                  model={"arrow"}
                                  style={{ color: "black", marginBottom: "10px" }}
                                  onClick={goToNextPage}
                                ></CustomizedButtons>
                              </Stack>
                            )}
                            <Stack direction="column" spacing={3}>
                              <Typography
                                style={{
                                  display: "flex",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                                variant="body1"
                                component="div"
                              >
                                Score Submission:
                              </Typography>

                              <Stack direction="row" spacing={3} alignItems="center">
                                <FormControl sx={{width:"100px"}}>
                                  <InputLabel id="demo-simple-select-label">
                                    Score
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={score}
                                    label="Score"
                                    onChange={handleChangeScore}
                                  >
                                    {Array.from(Array(10).keys()).map((index, key)=>(
                                      <MenuItem value={index} key={key}>{index}</MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <CustomizedPdfUploader
                                  id="submission"
                                  pdfFileName={submissionPdfFileName}
                                  setPdfFileName={setSubmissionPdfFileName}
                                  setPdfFile={setSubmissionPdfFile}
                                ></CustomizedPdfUploader>
                              </Stack>
                            </Stack>
                          </CardContent>
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
                      {peerReviewInfo.teams.map((team, key) => (
                        <Tab label={`Submission ${key + 1}`} />
                      ))}
                    </Tabs>
                  </CustomizedCard>
                </Stack>
              ) : (
                <CustomizedCard style={{flex:"1"}}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" >There is no submission to review</Stack>
                  </CardContent>
                </CustomizedCard>
              )}
            </div>
            {peerReviewInfo.teams.length !== 0 && (
              <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              mt={3}
              mr={20}
            >
              <CustomizedButtons type2>Cancel</CustomizedButtons>
              <CustomizedButtons type1 onClick={handleSubmitFile}>
                Submit
              </CustomizedButtons>
            </Stack>
            )}
          </CustomizedContainer>
        </>
      )}
    </CustomizedBody>
  );
}

export default PeerReviewAssignmentView;
