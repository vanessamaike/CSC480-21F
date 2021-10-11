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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 20,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function NavBar() {
  const nav = NavBarStyle();
  return (
    <AppBar
      style={{
        backgroundColor: secondaryColor,
        color: darkColor,
        flexDirection: "row",
      }}
      className={nav.appBar}
    >
      <Link to="/login" style={{ textDecoration: "none" }}>
        <div className={nav.logo}>logo</div>
      </Link>
      
      <div className={nav.link}>Home</div>
      <div className={nav.link}>Course and Assignment</div>
      <div className={nav.link}>Results</div>
      {/* <StyledBadge badgeContent={4} color="secondary">
        <div className={nav.link}>Results</div>
      </StyledBadge> */}
    </AppBar>
  );
}

export default NavBar;
