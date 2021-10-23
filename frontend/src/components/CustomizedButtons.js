import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from '@mui/styles';
import Button from "@mui/material/Button";
import {IoIosAddCircleOutline} from "react-icons/io";
import {BsArrowRightCircle} from "react-icons/bs";
import {BiCheckCircle} from 'react-icons/bi'
import CustomizedSwitch from "../components/CustomizedSwitch"
import CustomizedRadios from "../components/CustomizedRadios"
// core components
import ButtonStyle from "../styles/ButtonStyle";

const CustomizedButtons = React.forwardRef((props, ref) => {
  const {
    model,
    fullwidth,
    type1,
    type2,
    type3,
    height1,
    height2,
    children,
    filterType,
    setFilterType,
    requestFilter,
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
    [classes.height1]: height1,
    [classes.height2]: height2,
    [classes.root]: true
  });

  return (
    <Button {...rest} ref={ref} className={btnClasses}>
      {children}
      {model === "add" ? <IoIosAddCircleOutline size="1.5em" style={{marginLeft: "5px"}}/> : <>
      {model === "arrow" ? <BsArrowRightCircle size="1.5em" style={{marginLeft: "5px"}}/> : <>
      {model === "switch" ? <CustomizedSwitch /> : <>
      {model === "radio1" ? <CustomizedRadios type={'radio1'} filterType={filterType} setFilterType={setFilterType} /> : <>
      {model === "radio2" ? <CustomizedRadios type={'radio2'} filterType={filterType} setFilterType={setFilterType} /> : <>
      {model === "checked" ? <BiCheckCircle size="1.5em" style={{marginLeft: "5px"}}/> : <>
      </>}
      </>}
      </>}
      </>}
      </>}
      </>}
    </Button>
  );
});
CustomizedButtons.propTypes = {
  fullwidth: PropTypes.bool,
  type1: PropTypes.bool,
  type2: PropTypes.bool,
  type3: PropTypes.bool,
  height1: PropTypes.bool,
  height2: PropTypes.bool,

};
export default CustomizedButtons;
