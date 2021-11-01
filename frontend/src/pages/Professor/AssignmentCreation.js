import React, { useState } from "react";
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
} from "@mui/material";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import bg from "../../images/multi_background_dashboard.jpg";
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "../../styles/Style";
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { red } from "@mui/material/colors";
import { BiFontSize } from "react-icons/bi";
import { Document, Page, pdfjs } from 'react-pdf';
import PDFControlBar from '../../components/PDFhandling/PDFControlBar';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function AssignmentCreation() {
    const [solutionDueDate, setSolutionDueDate] = useState('');
    const [prDueDate, setPRDueDate] = useState('');
  
    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    // for onchange event
    const [pdfFile, setPdfFile]=useState(null);
    const [pdfFileError, setPdfFileError]=useState('');
  
    // for submit event
    const [viewPdf, setViewPdf]=useState(null);
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setIsLoading(false);
    }
    const fileType=['application/pdf'];
    const handlePdfFileChange=(e)=>{
      let selectedFile=e.target.files[0];
      if(selectedFile){
        if(selectedFile&&fileType.includes(selectedFile.type)){
          let reader = new FileReader();
              reader.readAsDataURL(selectedFile);
              reader.onloadend = (e) =>{
                setPdfFile(e.target.result);
                setPdfFileError('');
              }
        }
        else{
          setPdfFile(null);
          setPdfFileError('Please select valid pdf file');
        }
      }
      else{
        console.log('select your file');
      }
    }
    const handlePdfFileSubmit=(e)=>{
      e.preventDefault();
      if(pdfFile!==null){
        setViewPdf(pdfFile);
      }
      else{
        setViewPdf(null);
      }
    }

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    return (
        <div
            style={{
                backgroundImage: `url(${bg})`,
                height: "80vh",
                backgroundSize: "cover",
                paddingTop: "150px",
            }}
        >
            <NavBar fixed ></NavBar>
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-around",
                }}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={8}>
                        <Typography
                            style={{ fontWeight: "400" }}
                            variant="h6"
                            component="div"
                        >
                            New Assignment
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={2}>
                        <CustomizedButtons type2 >Preview</CustomizedButtons>
                    </Grid>
                </Grid>

                {/* First Box */}
                <Grid item xs={11.1}>
                    <Card
                        variant="outlined"
                        sx={{
                            overflow: "hidden",
                            p: 2,
                            border: "3px solid #fff",
                            borderRadius: "10px",
                            marginTop: "10px"
                        }}
                    >
                        <CardHeader
                            title={
                                <Stack>
                                    <Typography
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontWeight: "300",
                                            margin: "4px",
                                        }}
                                        variant="h6"
                                        component="div"
                                    >
                                        Assign Due Dates:
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <TextField onChange={(e) => setSolutionDueDate(e.target.value)}></TextField>
                                        <Typography
                                            style={{
                                                display: "flex",
                                                fontWeight: "600",
                                                marginLeft: "10px",
                                                alignItems: "center"
                                            }}
                                            variant="subtitle1"
                                            component="div"> Solution Due Date</Typography>
                                        <Grid xs={2}></Grid>
                                        <TextField onChange={(e) => setPRDueDate(e.target.value)}></TextField>
                                        <Typography
                                            style={{
                                                display: "flex",
                                                fontWeight: "600",
                                                marginLeft: "10px",
                                                alignItems: "center"
                                            }}
                                            variant="subtitle1"
                                            component="div"> Peer Review Due Date</Typography>


                                    </Box>
                                </Stack>
                            }
                        ></CardHeader>
                    </Card>
                </Grid>

                {/* second box */}
                <Grid item xs={11.1}>
                    <Card
                        variant="outlined"
                        sx={{
                            overflow: "hidden",
                            p: 2,
                            border: "3px solid #fff",
                            borderRadius: "10px",
                            marginTop: "25px"
                        }}
                    >
                        <CardHeader
                            title={
                                <Stack>
                                    <Typography
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontWeight: "300",
                                            margin: "4px",
                                        }}
                                        variant="h6"
                                        component="div"
                                    >
                                        PDF Attachments
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",

                                        }}
                                    >
                                        <TextField placeholder="Optional Comments" ></TextField>
                                        <Box sx={{ p: 2 }}></Box>
                                        <form onSubmit={handlePdfFileSubmit}>
                                        <input type="file" required onChange={handlePdfFileChange}></input>
                                        {pdfFileError&&<div style= {{
                                                            width: '100%',
                                                            color: red,
                                                            fontSize: '14px',
                                                            fontWeight: 600
                                                        }}>{pdfFileError}</div>}
                                        <CustomizedButtons type="submit" type1 onChange={handlePdfFileChange} model={"type1"}>Upload </CustomizedButtons>
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
                            marginBottom: "10px"
                        }}
                    >
                        <CardHeader
                            title={
                                <Stack>
                                    <Typography
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            fontWeight: "300",
                                            margin: "4px",
                                        }}
                                        variant="h6"
                                        component="div"
                                    >
                                        Schedule Send Date:
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",

                                        }}
                                    >
                                        <FormControl component="fieldset">
                                            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                                <FormControlLabel value="Drafts" control={<Radio
                                                    sx={{
                                                        color: darkColor,
                                                        '&.Mui-checked': {
                                                            color: darkColor,
                                                        },
                                                    }}
                                                />} label="Publish Now" />
                                            </RadioGroup>
                                        </FormControl>
                                        <TextField onChange={(e) => setPRDueDate(e.target.value)}></TextField>
                                        <Typography
                                            style={{
                                                display: "flex",
                                                fontWeight: "600",
                                                marginLeft: "10px",
                                                alignItems: "center"
                                            }}
                                            variant="subtitle1"
                                            component="div"> Pre-Schedule</Typography>
                                    </Box>
                                </Stack>
                            }
                        ></CardHeader>
                    </Card>
                </Grid>
                <Grid item xs={11} sx={{ display: "flex", justifyContent: "flex-end", margintop: "10px" }}>
                    <CustomizedButtons type2 model={"type2"}> Save Draft  </CustomizedButtons>
                    <Box sx={{ p: 2 }}></Box>
                    <CustomizedButtons type1 model={"type2"}> Publish  </CustomizedButtons> </Grid>


            </Container>
        </div>
    )
}

export default AssignmentCreation
