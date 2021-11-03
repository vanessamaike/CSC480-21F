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
    autocompleteClasses,
} from "@mui/material";
// styled components
import CustomizedContainer from "../../components/CustomizedContainer";
import CustomizedButtons from "../../components/CustomizedButtons";
import NavBar from "../../components/NavBar/NavBar";
import bg from "../../images/multi_background_dashboard.jpg";
import PDFControlBar from '../../components/PDFhandling/PDFControlBar';
import { Document, Page, pdfjs } from 'react-pdf';
import { useSelector } from "react-redux";
import { selectPdf } from "../../features/pdfSlice";
import viewPdf from "../../pdfsample/sample.pdf"
function AssignmentViewer() {
    const getPdf = useSelector(selectPdf);
    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    console.log(viewPdf)
    console.log(isLoading)
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
      }

const pdfGenerate = ()=>{
    // var doc =new jsPDF{uploaded pdf}
    // doc.save({name of the pdf})
}

// console.log(pdfFileErrorv);
    return (
        <div 
        style={{
            backgroundImage: `url(${bg})`,
            height: "80vh",
            backgroundSize: "cover",
            paddingTop: "150px",
          }}
        >
          <NavBar></NavBar>
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
                        <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={2}>
                        <CustomizedButtons type2 > Close Preview</CustomizedButtons>
                    </Grid>
                        </Grid>
                <div style={{
                    width: "100%",
                    height: "550px",
                    backgroundColor: "white",
                    overflowY: "auto",
                    padding: "10px",
                }}>
                    
                    <Grid item xs={15}>
                <Typography
                  style={{
                    display: "flex",
                    textAlign: "center",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                  variant="h6"
                  component="div"
                >
                  Due {/*due date from assignment creation page */}
                  <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={3}>
                        <CustomizedButtons type2 onClick={pdfGenerate} model={"download"}> Download PDF</CustomizedButtons>
                    </Grid>
                </Typography>
                        </Grid>
                    
                        <Container style={{
                            display: "flex",
                            padding: "10px",

                        }}>
                        {viewPdf&&<>
                                            <PDFControlBar
                                            scale={scale}
                                            setScale={setScale}
                                            numPages={numPages}
                                            pageNumber={pageNumber}
                                            setPageNumber={setPageNumber}
                                            file={viewPdf}
                                            />
                                            <Document
                                            file={viewPdf}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                            >
                                            <Page pageNumber={pageNumber} scale={scale} />
                                            </Document>
                                        </>}
                        </Container>
                        
                </div>
        </CustomizedContainer>
            
        </div>
    )
}

export default AssignmentViewer
