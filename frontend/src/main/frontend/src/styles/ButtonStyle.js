import { makeStyles } from '@mui/styles';
import { primaryColor, darkColor, whiteColor, grayColor } from "./Style";
const ButtonStyle = makeStyles((theme) => ({
  root: {
    minHeight: "auto",
    minWidth: "auto",
    borderRadius: "50px",
    textTransform: "unset",
    fontWeight: "600",
    padding: "5px 15px",
    height: "42px",
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer"
  },
  displayNone:{
    display : "none",
  },
  fullwidth: {
    width: "100%"
  },
  height1: {
    height: "33px",
  },
  height2: {
    height: "42px",
  },
  height3: {
    height: "26px",
  },
  type1: {
    backgroundColor: darkColor,

    color: whiteColor,
    border: "1px solid #000000",
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#222" }
  },
  type2: {
    backgroundColor: "transparent",
    color: darkColor,
    border: "1px solid #000000"
  },
  type3: {
    backgroundColor: grayColor,
    color: darkColor,
  },
  type4: {
    backgroundColor: "transparent",
    color: darkColor,
  },
}));

export default ButtonStyle;