import React, { useState, useEffect } from "react";
// @mui components
import { CardContent, Grid, List, Stack,Typography ,Box,CardHeader} from "@mui/material";
//PDF
import { Document, Page, pdfjs } from "react-pdf";
import assignmentPdf1 from "../../pdf/sample.pdf";
import assignmentPdf2 from "../../pdf/sample.pdf";
import assignmentPdf3 from "../../pdf/sample.pdf";

// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

import bg from "../../images/multi_background_dashboard.jpg";

import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectCourses, getCoursesByUserId } from "../../features/coursesSlice";
import Loading from "../../components/Loading";
import CustomizedPdfUploader from "../../components/CustomizedPdfUploader";
import CustomizedBody from "../../components/CustomizedBody";
import CustomizedTabs from "../../components/CustomizedTabs";


function StudentPeerReviewResultsDisplay({ history }) {
  let reviews = [assignmentPdf1, assignmentPdf2, assignmentPdf3];
  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;

  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  const [tab, setTab] = useState(0);
  // ========= main variable =======
  const [comments, setComments] = React.useState("");
  const [assignment, setAssignment] = useState();
  const [submissionPdfFile, setSubmissionPdfFile] = useState(null);

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

  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
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
              Peer Review Results
            </Typography>
          </Grid>
        </Grid>
        <CustomizedCard style={{ marginTop: "20px" }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
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
                Averaged Score: 19/20
              </Typography>
              <CustomizedButtons
                type3
                model={"download"}
                href={assignmentPdf1}
                download={true}
                title="download"
              >
                Download Reviews
              </CustomizedButtons>
            </Stack>
          </CardContent>
        </CustomizedCard>
        <div style={{ marginTop: "20px" }}>
          <CustomizedTabs
            type3
            setTab={setTab}
            value={tab}
            labels={["Review 1", " Review 2", "Review 3"]}
          ></CustomizedTabs>
          {reviews.map((pdfFile, key) => (
            <TabPanel value={tab} index={key}>
              <CustomizedCard>
                <CardHeader
                  sx={{
                    paddingBottom: "0",
                  }}
                  title={"Review 1"}
                ></CardHeader>
                <CardContent
                  sx={{
                    paddingTop: "0",
                  }}
                >
                 {pdfFile && (
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
                    file={pdfFile}
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
              )} </CardContent>
              </CustomizedCard>
            </TabPanel>
          ))}
        </div>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default StudentPeerReviewResultsDisplay;
