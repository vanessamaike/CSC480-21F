import React from "react";
import { Link } from "react-router-dom";
// @mui components
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import logo from "../../images/logo.png";

// styled components
import NavBarStyle from "../../styles/NavBarStyle";

import { whiteColor, darkColor } from "../../styles/Style";
import CustomizedContainer from "../CustomizedContainer";
import { Grid } from "@mui/material";

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
            <Grid item xs={3}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <img className={nav.logo} src={`${logo}`} />
              </Link>
            </Grid>
            <Grid item container xs={9} rowSpacing={2} >
              <Grid item xs={3}>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Home</div>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link
                  to="/course"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Courses & Assignments</div>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link
                  to="/studentinfoview"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Students & Teams</div>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link
                  to="/courseresult"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Results</div>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </CustomizedContainer>
        {/* <StyledBadge badgeContent={4} color="secondary">
        <div className={nav.link}>Results</div>
      </StyledBadge> */}
      </AppBar>
    </div>
  );
}

export default NavBar;
