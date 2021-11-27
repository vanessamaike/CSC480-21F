import React from "react";
import { Link } from "react-router-dom";
// @mui components
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import logo from "../../images/logo.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
// styled components
import NavBarStyle from "../../styles/NavBarStyle";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/userSlice";
import { whiteColor, darkColor } from "../../styles/Style";
import CustomizedContainer from "../CustomizedContainer";
import { Grid, Stack, Button, Menu, MenuItem, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
function NavBar({ history }) {

  const nav = NavBarStyle();

  return (
    <div className={nav.root}>
      <AppBar
        style={{
          backgroundColor: whiteColor,
          color: darkColor,
          flexDirection: "row",
        }}
        className={nav.appBar}
      >
        <CustomizedContainer>
          <Grid
            container
            rowSpacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={2}>
                <img className={nav.logo} src={`${logo}`} />

            </Grid>
          </Grid>
        </CustomizedContainer>
      </AppBar>
    </div>
  );
}

export default NavBar;
