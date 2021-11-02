import React from "react";
import { Link } from "react-router-dom";
// @mui components

import { styled } from "@mui/material/styles";
import logo from "../images/logo.png";

// styled components
import LoadingStyle from "../styles/LoadingStyle";

import CustomizedContainer from "../components/CustomizedContainer";
import CustomizedCard from "../components/CustomizedCard";
import { CircularProgress, Grid, Stack } from "@mui/material";

function Loading({ history }) {
  const loading = LoadingStyle();

  return (
    <CustomizedContainer >
      <CustomizedCard >
        <div className={loading.box}>
        <img className={loading.logo} src={`${logo}`} />
      <CircularProgress className={loading.loading}></CircularProgress>
        </div>
      </CustomizedCard>
    </CustomizedContainer>
  );
}

export default Loading;
