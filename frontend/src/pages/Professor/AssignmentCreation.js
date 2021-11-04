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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedRadios from "../../components/CustomizedRadios";
import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { secondaryColor, primaryColor, darkColor, blueColor, greenColor, purpleColor } from "../../styles/Style";
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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function AssignDueDate() { }


function AssignmentCreation() {
    const [solutionDueDate, setSolutionDueDate] = useState('');
    const [prDueDate, setPRDueDate] = useState('');

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    return (
        <CustomizedBody bg={bg}>
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
                    <Grid item xs={8} sx={{display: "flex", alignItems: "center"}}>
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
                                        <CustomizedButtons type1 model={"type1"}>Upload </CustomizedButtons>
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
        </CustomizedBody>
    )
}

export default AssignmentCreation
