import React from "react";
// @mui components

import { styled } from "@mui/material/styles";
import logo from "../images/logo.png";

// styled components
import LoadingStyle from "../styles/LoadingStyle";

import CustomizedContainer from "../components/CustomizedContainer";
import CustomizedCard from "../components/CustomizedCard";
import { CircularProgress } from "@mui/material";

function Loading({ history, error }) {
  const loading = LoadingStyle();

  return (
    <CustomizedContainer>
      <CustomizedCard>
        <div className={loading.box}>
          <img className={loading.logo} src={`${logo}`} />
          <div>{error}</div>
          <CircularProgress className={loading.loading}></CircularProgress>
        </div>
      </CustomizedCard>
    </CustomizedContainer>
  );
}

export default Loading;
