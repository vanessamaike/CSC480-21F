import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Radio,
  autocompleteClasses,
} from "@mui/material";
// styled components
import CustomizedTabs from "../../components/CustomizedTabs";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedButtons from "../../components/CustomizedButtons";
import NavBar from "../../components/NavBar/NavBar";
import bg from "../../images/multi_background_dashboard.jpg";
import PDFControlBar from "../../components/PDFhandling/PDFControlBar";
import { Document, Page, pdfjs } from "react-pdf";

import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";
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

function AssignmentDisplay({ history, location }) {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = React.useState(0);
  //const [isPreV, setisPreV] = useState(initialState)
  //const [assignment, setAssignment] = useState();

  var assignment = location.state.assignment;
  var solutionPdf = assignment.solutionPdfDoc;
  var peerReviewPdf = assignment.peerReviewPdfDoc;

  console.log(assignment);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  //   const handlePreviewMode = () => {
  //     setIsPreviewMode(false);
  //   };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };

  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed></NavBar>
      <CustomizedContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "600",
            }}
            variant="h6"
            component="div"
          >
           {assignment.title}
          </Typography>
          {assignment.draft === true ? (
          <Typography
            style={{
              display: "flex",
              color: "#777",
              fontWeight: "500",
              alignItems: "center",
            }}
            variant="h6"
            component="div"
          >
           (Draft)
          </Typography>
          ) : (
            <></>
          )}
          </Stack>
          
          <Stack direction="row" spacing={2}>
            <CustomizedButtons
              type1
              onClick={() => {
                history.push("/assignmentedit", {
                  assignment: assignment,
                  courseID: assignment.courseID,
                });
              }}
            >
              Edit Assignment
            </CustomizedButtons>
            {assignment.draft === true ? (
              <CustomizedButtons
                type1
                onClick={() => {
                  history.push("/assignmentedit", {
                    assignment: assignment,
                    courseID: assignment.courseID,
                  });
                }}
              >
                Publish
              </CustomizedButtons>
            ) : (
              <></>
            )}
          </Stack>
        </div>

        <CustomizedCard sx={{ margin: "20px 0" }}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
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
                    Publish Date:
                  </Typography>
                  <Typography
                    style={{
                      display: "flex",
                      textAlign: "center",
                    }}
                    variant="body1"
                    component="div"
                  >
                    {new Date(assignment.publishDateTime).toDateString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
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
                    Solution Due Date:
                  </Typography>
                  <Typography
                    style={{
                      display: "flex",
                      textAlign: "center",
                    }}
                    variant="body1"
                    component="div"
                  >
                    {new Date(assignment.solutionDueDateTime).toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
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
                    Peer Review Due:
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
                      assignment.peerReviewDueDateTime
                    ).toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </CustomizedCard>
        <div>
          <CustomizedTabs
            type1
            setTab={setTab}
            tab={tab}
            labels={["Solution", "Peer Review"]}
          ></CustomizedTabs>
          <TabPanel value={tab} index={0}>
            <CustomizedCard>
              <CardContent>
                {solutionPdf && (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CustomizedButtons
                      model={"arrowL"}
                      style={{ color: "black", marginBottom: "10px" }}
                      onClick={goToPreviousPage}
                    ></CustomizedButtons>
                    <Document
                      file={{ data: solutionPdf }}
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
            </CustomizedCard>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <CustomizedCard>
              <CardContent>
                <>
                  {peerReviewPdf && (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomizedButtons
                        model={"arrowL"}
                        style={{ color: "black", marginBottom: "10px" }}
                        onClick={goToPreviousPage}
                      ></CustomizedButtons>
                      <Document
                        file={{ data: peerReviewPdf }}
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
                </>
              </CardContent>
            </CustomizedCard>
          </TabPanel>
        </div>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default AssignmentDisplay;
