import React, { useState, useEffect } from "react";
// @mui components
import Typography from "@mui/material/Typography";
//PDF
import { Document, Page, pdfjs } from "react-pdf";
import assignmentPdf from "../../pdf/sample.pdf";

// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

import bg from "../../images/multi_background_dashboard.jpg";
import { CardContent, Grid, List, Stack } from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/Loading";
import CustomizedPdfUploader from "../../components/CustomizedPdfUploader";
import CustomizedBody from "../../components/CustomizedBody";
import CustomizedTextField from "../../components/CustomizedTextField";
function PeerReviewAssignmentView({ history , location}) {
  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;

  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  // ========= main variable =======
  const [comments, setComments] = React.useState("");
  const [assignment, setAssignment] = useState();
  const [submissionPdfFile, setSubmissionPdfFile] = useState();
  const [linkDownload, setLinkDownload] = useState();
  useEffect(() => {
    if (assignment !== undefined) {
      // =========== Handle PDF Download From Byte Array ==================
      var blob = new Blob([assignment.peerReviewPdfDoc], { type: "application/pdf" });
      blob = window.URL.createObjectURL(blob);
      setLinkDownload(blob)
      setLoading(false);
    }
  }, [assignment]);

  useEffect(() => {
    setAssignment(location.state.assignment);
  }, []);

  //======= handle send request to backend =====
  const handleSubmitFile = (event) => {
    //TODO add function to send request to backend
    console.log(comments);
    console.log(submissionPdfFile);
     history.push("/seeallassignment");
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
                  {`${assignment.title} Peer Review`}
                </Typography>
              </Grid>
            </Grid>
            <div>
              <CustomizedCard style={{ marginTop: "20px" }}>
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
                          Due Date: {new Date(assignment.peerReviewDueDateTime).toLocaleString()}
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
                    </div>
                  </List>
                  {assignmentPdf && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      <CustomizedButtons
                        model={"arrowL"}
                        style={{ color: "black", marginBottom: "10px" }}
                        onClick={goToPreviousPage}
                      ></CustomizedButtons>
                      <Document
                        file={{data : assignment.peerReviewPdfDoc}}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} scale={scale} />
                      </Document>
                      <CustomizedButtons
                        model={"arrow"}
                        style={{ color: "black", marginBottom: "10px" }}
                        onClick={goToNextPage}
                      ></CustomizedButtons>
                    </div>
                  )}
                </CardContent>
              </CustomizedCard>{" "}
              <CustomizedCard
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <CardContent>
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
                      Submit Peer Reviews as separate PDF attachments:
                    </Typography>

                    <Stack direction="row" spacing={3}>
                      <CustomizedTextField
                        comments
                        handleTextFieldChange={setComments}
                      >
                        Comments
                      </CustomizedTextField>
                      <CustomizedPdfUploader
                        id="submission"
                        multiplePdf
                        setPdfFile={setSubmissionPdfFile}
                      ></CustomizedPdfUploader>
                    </Stack>
                  </Stack>
                </CardContent>
              </CustomizedCard>
            </div>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <CustomizedButtons type2>Cancel</CustomizedButtons>
              <CustomizedButtons type1 onClick={handleSubmitFile}>
                Submit
              </CustomizedButtons>
            </Stack>
          </CustomizedContainer>
        </>
      )}
    </CustomizedBody>
  );

}

export default PeerReviewAssignmentView;
