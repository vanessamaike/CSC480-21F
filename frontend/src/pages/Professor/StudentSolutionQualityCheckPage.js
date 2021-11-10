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
import { Document, Page, pdfjs } from 'react-pdf';
import PDFControlBar from '../../components/PDFhandling/PDFControlBar';
import viewPdf from "../../pdf/sample.pdf"

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
  Breadcrumbs
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";

function StudentSolutionQualityCheckPage({ history }) {
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
          <Typography color="text.primary" style={{fontWeight:"600"}}>Peer Review Results</Typography>
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
              Solution Quality Check
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
                <div style={{display: "flex", justifyContent: "center"}}>
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
        </div>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default StudentSolutionQualityCheckPage;
