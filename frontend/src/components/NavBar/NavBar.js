import React from "react";
// @mui components
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
// styled components
import NavBarStyle from "../../styles/NavBarStyle";
import { secondaryColor, primaryColor, fontColor } from "../../styles/Style";

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
        color: fontColor,
        flexDirection: "row",
      }}
      className={nav.appBar}
    >
      <div className={nav.logo}>logo</div>
      <div className={nav.link}>Course</div>
      <div className={nav.link}>Assignment</div>
      <StyledBadge badgeContent={4} color="secondary">
        <div className={nav.link}>Results</div>
      </StyledBadge>
    </AppBar>
  );
}

export default NavBar;