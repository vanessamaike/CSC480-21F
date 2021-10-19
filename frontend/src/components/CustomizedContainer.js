import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from '@mui/styles';
import {IoIosAddCircleOutline} from "react-icons/io";
import {BsArrowRightCircle} from "react-icons/bs";

// core components
import ContainerStyle from "../styles/ContainerStyle";
import { Container } from "@mui/material";

const CustomizedContainer = React.forwardRef((props, ref) => {
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
  const classes = ContainerStyle();
  //const classes = makeComponentStyles();
  const containerClasses = classNames({
    [classes.container]: true,
    [classes.containerFluid]: true
  });

  return (
    <Container {...rest} ref={ref} className={containerClasses}>
      {children}
    </Container>
  )
});
CustomizedContainer.propTypes = {
  container: PropTypes.bool,
  containerFluid: PropTypes.bool,
};
export default CustomizedContainer;
