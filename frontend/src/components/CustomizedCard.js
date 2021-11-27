import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// core components
import CardStyle from "../styles/CardStyle";
import { Card } from "@mui/material";

const CustomizedCard = React.forwardRef((props, ref) => {
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
  const classes = CardStyle();
  //const classes = makeComponentStyles();
  const cardClasses = classNames({
    [classes.root]: true,
  });

  return (
    <Card {...rest} ref={ref} variant="outlined" className={cardClasses}>
      {children}
    </Card>
  )
});
CustomizedCard.propTypes = {
  root: PropTypes.bool,
};
export default CustomizedCard;
