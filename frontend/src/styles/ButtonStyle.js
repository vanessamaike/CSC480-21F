import { makeStyles } from "@mui/styles";
import { secondaryColor, primaryColor, fontColor } from "./Style";
const ButtonStyle = makeStyles((theme) => ({
  seeAll: {
    backgroundColor: "#000000",
    color: primaryColor,
  },
  status: {
    backgroundColor: primaryColor,
    color: "#000000",
    border: "1px solid #000000"
  },
  view: {
    backgroundColor: primaryColor,
    color: "#000000",
    border: "1px solid #000000"
  }
}));

export default ButtonStyle;