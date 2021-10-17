import { makeStyles } from '@mui/styles';
import { secondaryColor, primaryColor, darkColor } from "./Style";
const ButtonStyle = makeStyles((theme) => ({
  root: {
    minHeight: "auto",
    minWidth: "auto",
    borderRadius: "50px",
    textTransform: "unset",
    fontWeight: "600",
  },
  fullwidth: {
    width: "100%"
  },
  type1: {
    backgroundColor: darkColor,
    color: secondaryColor,
    border: "1px solid #000000",
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#222" }
  },
  type2: {
    backgroundColor: secondaryColor,
    color: darkColor,
    border: "1px solid #000000"
  },
  type3: {
    backgroundColor: primaryColor,
    color: darkColor,
  }
}));

export default ButtonStyle;