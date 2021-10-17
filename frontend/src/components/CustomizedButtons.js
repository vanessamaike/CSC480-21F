import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from '@mui/styles';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
// core components
import ButtonStyle from "../styles/ButtonStyle";

const CustomizedButtons = React.forwardRef((props, ref) => {
  const {
    model,
    fullwidth,
    type1,
    type2,
    type3,
    children,
    ...rest
  } = props;

  // Styles
  const classes = ButtonStyle();
  //const classes = makeComponentStyles();
  const btnClasses = classNames({
    [classes.fullwidth]: fullwidth,
    [classes.type1]: type1,
    [classes.type2]: type2,
    [classes.type3]: type3,
    [classes.root]: true
  });

  return (
    <Button {...rest} ref={ref} className={btnClasses}>
      {children}
      {model === "type1" ? <AddCircleOutlineIcon sx={{marginLeft: "5px"}}/> : 
      <>{model === "type2" ? <ArrowCircleUpIcon sx={{marginLeft: "5px", transform: "rotate(90deg)"}}/> : <></>}</>}
    </Button>
  );
});
CustomizedButtons.propTypes = {
  fullwidth: PropTypes.bool,
  type1: PropTypes.bool,
  type1: PropTypes.bool,
  type1: PropTypes.bool,
};
export default CustomizedButtons;
