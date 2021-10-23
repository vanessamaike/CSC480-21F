import React, { useState } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";
import CustomizedRadios from "../../components/CustomizedRadios";
import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";

import {
    CardContent,
    CardHeader,
    Divider,
    Box,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";


const styles = theme => ({
    input: {
        height: 30,
        paddingTop: "5px"
    },
});



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

function StudentTeamView({ history }) {
    const [value, setValue] = useState(0);
    const [isOpenedAddStudentBox, setIsOpenedAddStudentBox] = useState(false);
    const handleAddStudent = () => {
        setIsOpenedAddStudentBox(false);
    }
    const handleOpenAddStudentBox = () => {
        setIsOpenedAddStudentBox(true);
    };
    return (
        <div
            style={{
                backgroundImage: `url(${bg})`,
                height: "80vh",
                backgroundSize: "cover",
                paddingTop: "150px",
            }}
        >
            <NavBar fixed history={history}></NavBar>
            <CustomizedContainer>
                <Grid container sx={{ marginBottom: "20px" }}>
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
                            Student Information
            </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <CustomizedButtons type2 model={"add"}>
                            <Link
                                to="/coursecreation"
                                style={{ textDecoration: "none", color: "#000" }}
                            >
                                <div>Delete Course</div>
                            </Link>
                        </CustomizedButtons>
                    </Grid>
                </Grid>
                <div>
                    <CustomizedTabs
                        type2
                        setValue={setValue}
                        value={value}
                    ></CustomizedTabs>
                    {[1, 2, 3, 4].map((id) => (
                        <TabPanel value={value} index={id - 1}>
                            <CustomizedCard>
                                <CardHeader
                                    sx={{
                                        paddingBottom: "0",
                                    }}
                                    title={
                                        <Grid container>
                                            <Grid item xs={9}>
                                                <CustomizedButtons
                                                    type3
                                                    model={"add"}
                                                    model={"switch"}
                                                >
                                                    Team List
                          </CustomizedButtons>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={3}
                                                sx={{ display: "flex", justifyContent: "flex-end" }}
                                            >
                                                <CustomizedButtons
                                                    type3
                                                    model={"expand"}

                                                >
                                                    Expand All
                          </CustomizedButtons>
                                            </Grid>
                                        </Grid>
                                    }
                                ></CardHeader>
                                <CardContent
                                    sx={{
                                        paddingTop: "0",
                                    }}
                                >
                                    <List component="nav" aria-label="mailbox folders">
                                        {[1, 2, 3].map((value) => (
                                            <ListItem
                                                button
                                                divider
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="delete">
                                                    </IconButton>
                                                }
                                            >
                                                <ListItemText primary="Team" />
                                                <ListItemText
                                                    sx={{ display: "flex", justifyContent: "flex-end" }}
                                                    primary="team members"
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </CustomizedCard>
                        </TabPanel>
                    ))}
                </div>
            </CustomizedContainer>
        </div>
    );
}

export default StudentTeamView;
