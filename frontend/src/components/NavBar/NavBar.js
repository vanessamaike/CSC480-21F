import React from "react";
import { Link } from "react-router-dom";
// @mui components
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
// styled components
import NavBarStyle from "../../styles/NavBarStyle";

import { secondaryColor, primaryColor, darkColor } from "../../styles/Style";


function NavBar({ history }) {
  const nav = NavBarStyle();

  return (
    <div className={nav.root}>
      <AppBar
        style={{
          backgroundColor: secondaryColor,
          color: darkColor,
          flexDirection: "row",
        }}
        className={nav.appBar}
      >
        <Link to="/login" style={{ textDecoration: "none", color: "#000" }}>
          <div className={nav.logo}>CPR Logo</div>
        </Link>
        <Link to="/home" style={{ textDecoration: "none", color: "#000" }}>
          <div className={nav.link}>Home</div>
        </Link>
        <Link to="/course" style={{ textDecoration: "none", color: "#000" }}>
          <div className={nav.link}>Courses & Assignments</div>
        </Link>
        <Link to="/course" style={{ textDecoration: "none", color: "#000" }}>
          <div className={nav.link}>Students & Teams</div>
        </Link>
        <Link to="/result" style={{ textDecoration: "none", color: "#000" }}>
          <div className={nav.link}>Results</div>
        </Link>
        {/* <StyledBadge badgeContent={4} color="secondary">
        <div className={nav.link}>Results</div>
      </StyledBadge> */}
      </AppBar>
    </div>
  );
}

export default NavBar;
