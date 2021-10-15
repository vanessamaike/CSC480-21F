import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import makeStyles  from "@mui/styles/makeStyles";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";

// core components
import ButtonStyle from "../styles/ButtonStyle";

const makeComponentStyles = styled(() => ({
  ...ButtonStyle,
}));

const CustomizedButtons = React.forwardRef((props, ref) => {
  const {
    model,
    type1,
    type2,
    type3,
    children,
    ...rest
  } = props;

  // Styles
  const classes = makeComponentStyles();
  const btnClasses = classNames({
    [classes[model]]: model,
    [classes.type1]: type1,
    [classes.type2]: type2,
    [classes.type3]: type3,
  });

  return (
    <Button {...rest} ref={ref} className={btnClasses}>
      {children}
    </Button>
  );
});
CustomizedButtons.propTypes = {
  model: PropTypes.oneOf(["model1", "model2", "model3"]),
  type1: PropTypes.bool,
  type1: PropTypes.bool,
  type1: PropTypes.bool,
};
export default CustomizedButtons;
