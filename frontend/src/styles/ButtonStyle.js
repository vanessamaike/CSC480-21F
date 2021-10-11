import { makeStyles } from "@mui/styles";
import { secondaryColor, primaryColor, fontColor } from "./Style";
const ButtonStyle = makeStyles((theme) => ({
  type1: {
    backgroundColor: primaryColor,
    color: primaryColor,
  },
  type2: {
    backgroundColor: primaryColor,
    color: "#000000",
    border: "1px solid #000000"
  },
  type3: {
    backgroundColor: primaryColor,
    color: "#000000",
    border: "1px solid #000000"
  }
}));

export default ButtonStyle;