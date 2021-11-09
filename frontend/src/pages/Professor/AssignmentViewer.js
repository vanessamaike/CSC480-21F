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
import { selectPdf } from "../../features/pdfSlice";
// import viewPdf from "../../pdfsample/sample.pdf"
import Loading from "../../components/Loading";
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

function AssignmentViewer({ viewPdf, setIsPreviewMode }) {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = React.useState(0);
  console.log(viewPdf);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }
  const handlePreviewMode = () => {
    setIsPreviewMode(false)
  }
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };

  return (
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
              Assignment
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <Link
              to="/assignmentcreation"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <CustomizedButtons type2 onClick={handlePreviewMode}> Close Preview</CustomizedButtons>
            </Link>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "90px",
            backgroundColor: "white",
            overflowY: "auto",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <Grid item xs={4}>
            <Typography
              style={{
                padding: "30px",
                display: "flex",
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "300px",
              }}
              variant="h7"
              component="div"
            >
              Publish Date:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              style={{
                padding: "30px",
                display: "flex",
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "300px",
              }}
              variant="h7"
              component="div"
            >
              Solution Due Date:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              style={{
                padding: "30px",
                display: "flex",
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "300px",
              }}
              variant="h7"
              component="div"
            >
              Peer Review Due:
            </Typography>
          </Grid>
        </div>
        <div>
          <CustomizedTabs
            type1
            setTab={setTab}
            tab={tab}
            labels={["Solution", "Peer Review"]}
          ></CustomizedTabs>
          {["Solution", "Peer Review"].map((course, key) => {
            return (
              <TabPanel value={tab} index={key}>
                <CustomizedCard>
                  <Container
                    style={{
                      alignItems: "center",
                      marginLeft: "100px",
                      display: "flex",
                      padding: "10px",
                    }}
                  >
                    {viewPdf && (
                      <>
                        <CustomizedButtons
                          model={"arrowL"}
                          style={{ color: "black", marginBottom: "10px" }}
                          onClick={goToPreviousPage}
                        ></CustomizedButtons>
                        <Document
                          file={viewPdf}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page pageNumber={pageNumber} scale={scale} />
                        </Document>
                        <CustomizedButtons
                          model={"arrow"}
                          style={{ color: "black", marginBottom: "10px" }}
                          onClick={goToNextPage}
                        ></CustomizedButtons>
                      </>
                    )}
                  </Container>
                </CustomizedCard>
              </TabPanel>
            );
          })}
        </div>
      </CustomizedContainer>
  );
}

export default AssignmentViewer;
{
  /* <div>
              
            </div> */
}
