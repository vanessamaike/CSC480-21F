import React, { useState } from "react";
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
  Breadcrumbs,
} from "@mui/material";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import bg from "../../images/multi_background_dashboard.jpg";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  secondaryColor,
  primaryColor,
  darkColor,
  blueColor,
  greenColor,
  purpleColor,
} from "../../styles/Style";
import CustomizedBody from "../../components/CustomizedBody";
// Worker
import { red } from "@mui/material/colors";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector, useDispatch } from "react-redux";
import CustomizedContainer from "../../components/CustomizedContainer";
import axios from "axios";
import AssignmentViewer from "./AssignmentViewer";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function AssignmentCreation1() {
  const [title, setTitle] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [solutionDueDate, setSolutionDueDate] = useState(new Date());
  const [prDueDate, setPRDueDate] = useState(new Date());

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");


  // for submit event
  console.log(isPreviewMode);
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
          //axios.post("pi.cs.oswego.edu:9081/api/assignment", e.target.result);
          console.log(e.target.result);
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };
  const handlePdfFileSubmit = (e) => {
   
  };

  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed></NavBar>
      <>
        {isPreviewMode === false ? (
          <CustomizedContainer>
            <Breadcrumbs aria-label="breadcrumb" mb={5} ml={2}>
              <Typography color="text.primary">Home</Typography>
              <Typography color="text.primary">Courses</Typography>
              <Typography color="text.primary">Course Name</Typography>
              <Typography color="text.primary" style={{ fontWeight: "600" }}>New Assignment</Typography>
            </Breadcrumbs>
            <Grid container spacing={2}>
              <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  style={{ fontWeight: "300" }}
                  variant="h5"
                  component="div"
                >
                  Build New Assignment
                </Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={2}>
                <CustomizedButtons
                  type2
                  onClick={() => {
                    setIsPreviewMode(true);
                  }}
                >
                  Preview
                </CustomizedButtons>
              </Grid>
            </Grid>

            {/* First Box */}
            <div>
              <Grid item xs={11.1}>
                <Card
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    p: 2,
                    border: "3px solid #fff",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                >
                  <CardHeader
                    title={
                      <Stack>
                        <Typography
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontWeight: "500",
                            margin: "4px",
                          }}
                          variant="h6"
                          component="div"
                        >
                          Title Assignment:
                        </Typography>
                        <Box sx={{}}>
                          <Box sx={{ display: "flex", marginBottom: "20px" }}>
                            <TextField
                              placeholder="Title"
                              onChange={(e) => setTitle(e.target.value)}
                            ></TextField>
                            <Typography
                              style={{
                                display: "flex",
                                fontWeight: "600",
                                marginLeft: "10px",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                              variant="subtitle1"
                              component="div"
                            >
                              {" "}
                              ‘Solution’ and ‘Peer Review’ will be added to
                              title in their respective phases.
                            </Typography>
                          </Box>

                          <Typography
                            style={{
                              fontWeight: "300",
                              //marginLeft: "10px",
                              alignItems: "center",
                            }}
                            variant="subtitle2"
                            component="div"
                          >
                            Please select submission type. Teams submissions
                            should be used when groups of students will submit a
                            solution together.
                          </Typography>

                          <FormControl component="fieldset">
                            <RadioGroup
                              row
                              aria-label="position"
                              name="position"
                              defaultValue="top"
                            >
                              <FormControlLabel
                                value="Manually Set Teams"
                                control={
                                  <Radio
                                    sx={{
                                      color: darkColor,
                                      "&.Mui-checked": {
                                        color: darkColor,
                                      },
                                    }}
                                  />
                                }
                                label="Manually Set Teams (student-defined)"
                              />
                              <FormControlLabel
                                value="Randomized Teams"
                                control={
                                  <Radio
                                    sx={{
                                      color: darkColor,
                                      "&.Mui-checked": {
                                        color: darkColor,
                                      },
                                    }}
                                  />
                                }
                                label="Randomized Teams"
                              />
                              <FormControlLabel
                                value="Independent"
                                control={
                                  <Radio
                                    sx={{
                                      color: darkColor,
                                      "&.Mui-checked": {
                                        color: darkColor,
                                      },
                                    }}
                                  />
                                }
                                label="Independent"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </Stack>
                    }
                  ></CardHeader>
                </Card>
              </Grid>
            </div>

            {/* second box */}
            <Grid item xs={11.1}>
              <Card
                variant="outlined"
                sx={{
                  overflow: "hidden",
                  p: 2,
                  border: "3px solid #fff",
                  borderRadius: "10px",
                  marginTop: "25px",
                }}
              >
                <CardHeader
                  title={
                    <Stack>
                      <Typography
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontWeight: "600",
                        }}
                        variant="h6"
                        component="div"
                      >
                        Solution Assignment Content:
                      </Typography>
                      <Typography
                        style={{
                          fontWeight: "300",
                          //marginLeft: "10px",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                        variant="subtitle2"
                        component="div"
                      >
                        Please set the due date and upload instruction PDFs to
                        be displayed within solution assignment.
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Solution Due Date"
                            value={solutionDueDate}
                            onChange={(newValue) => {
                              setSolutionDueDate(newValue);
                            }}
                          />
                        </LocalizationProvider>

                        <Box sx={{ p: 2 }}></Box>

                        <form onSubmit={handlePdfFileSubmit}>
                          <input
                            type="file"
                            required
                            onChange={handlePdfFileChange}
                          ></input>
                          {pdfFileError && (
                            <div
                              style={{
                                width: "100%",
                                color: red,
                                fontSize: "14px",
                                fontWeight: 600,
                              }}
                            >
                              {pdfFileError}
                            </div>
                          )}
                          <Box sx={{ display: "flex" }}>
                            <CustomizedButtons
                              type="submit"
                              type1
                              onChange={handlePdfFileChange}
                              model={"type1"}
                            >
                              Upload{" "}
                            </CustomizedButtons>
                            <Typography
                              style={{
                                display: "flex",
                                fontWeight: "600",
                                alignItems: "center",
                                marginTop: "10px",
                                marginBottom: "10px",
                                marginLeft: "10px",
                              }}
                              variant="subtitle1"
                              component="div"
                            >
                              Solution Instructions
                            </Typography>
                          </Box>
                        </form>
                      </Box>
                    </Stack>
                  }
                ></CardHeader>
              </Card>
            </Grid>

            {/* third box */}
            <Grid item xs={11.1}>
              <Card
                variant="outlined"
                sx={{
                  overflow: "hidden",
                  p: 1,
                  border: "3px solid #fff",
                  borderRadius: "10px",
                  marginTop: "25px",
                  marginBottom: "10px",
                }}
              >
                <CardHeader
                  title={
                    <Stack>
                      <Typography
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          fontWeight: "600",
                        }}
                        variant="h6"
                        component="div"
                      >
                        Peer Review Assignment Content:
                      </Typography>
                      <Typography
                        style={{
                          fontWeight: "300",
                          //marginLeft: "10px",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                        variant="subtitle2"
                        component="div"
                      >
                        Please set the due date and upload instruction PDFs to
                        be displayed within Peer Review Assignment. Please note
                        that peer reviews must be manually sent for review by
                        professors after quality checking.
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Peer Review Due Date"
                            value={prDueDate}
                            onChange={(newValue) => {
                              setPRDueDate(newValue);
                            }}
                          />
                        </LocalizationProvider>

                        <Box sx={{ p: 2 }}></Box>
                        <form onSubmit={handlePdfFileSubmit}>
                          <input
                            type="file"
                            required
                            onChange={handlePdfFileChange}
                          ></input>
                          {pdfFileError && (
                            <div
                              style={{
                                width: "100%",
                                color: red,
                                fontSize: "14px",
                                fontWeight: 600,
                              }}
                            >
                              {pdfFileError}
                            </div>
                          )}
                          <Box sx={{ display: "flex" }}>
                            <CustomizedButtons
                              type="submit"
                              type1
                              onChange={handlePdfFileChange}
                              model={"type1"}
                            >
                              Upload{" "}
                            </CustomizedButtons>
                            <Typography
                              style={{
                                display: "flex",
                                fontWeight: "600",
                                alignItems: "center",
                                marginTop: "10px",
                                marginBottom: "10px",
                                marginLeft: "10px",
                              }}
                              variant="subtitle1"
                              component="div"
                            >
                              Peer Review Instructions
                            </Typography>
                          </Box>
                        </form>
                      </Box>
                    </Stack>
                  }
                ></CardHeader>
              </Card>
            </Grid>
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margintop: "10px",
              }}
            >
              <CustomizedButtons type2 model={"type2"}>
                {" "}
                Save Draft{" "}
              </CustomizedButtons>
              <Box sx={{ p: 2 }}></Box>
              <Link
                to="/professorhome"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <CustomizedButtons type1>Publish</CustomizedButtons>
              </Link>
            </Grid>
          </CustomizedContainer>
        ) : (
          <AssignmentViewer
            viewPdf={pdfFile}
            setIsPreviewMode={setIsPreviewMode}
          />
        )}
      </>
    </CustomizedBody>
  );
}

export default AssignmentCreation1;