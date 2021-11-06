import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { IoDownloadOutline } from "react-icons/io5";
import {
    Box,
    TextField,
  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IoIosAddCircleOutline, IoIosArrowDropdown } from "react-icons/io";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { BiCheckCircle } from "react-icons/bi";
import CustomizedSwitch from "../components/CustomizedSwitch";
import CustomizedRadios from "../components/CustomizedRadios";
// core components
import ButtonStyle from "../styles/ButtonStyle";

const CustomizedTextField = React.forwardRef((props, ref) => {
  const {text, handleTextFieldChange, comments, children, ...rest } = props;

  // Styles
  const classes = ButtonStyle();
  //const classes = makeComponentStyles();


  return (
    <Box
  
  >
    <>  {(Comment) ? (<TextField
      sx={{ bgcolor: "#fff" }}
      label={children}
      id="outlined-size-small"
      size="small"
      multiline
      maxRows={4}
      onChange={handleTextFieldChange}
    />) : (<TextField
        sx={{ bgcolor: "#fff" }}
        label={children}
        id="outlined-size-small"
        size="small"
        onChange={handleTextFieldChange}
      />)}</>
    </Box>
  );
});
CustomizedTextField.propTypes = {
 
};
export default CustomizedTextField;
