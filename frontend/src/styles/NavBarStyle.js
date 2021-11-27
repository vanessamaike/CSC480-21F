import { makeStyles } from "@mui/styles";
import { secondaryColor, primaryColor, fontColor, grayColor, blueColor } from "./Style";
const NavBarStyle = makeStyles((theme) => ({
  root: {
    flexGrow: "1"
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    border: "0",
    borderRadius: "3px",
    marginBottom: "20px",
    color: "#f11111",
    width: "100%",
    height: "80px",
    backgroundColor: "red",
    // boxShadow:
    //   "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "collumn nowrap",
    justifyContent: "start",
    position: "fixed",
    zIndex: "2",
  },
  logo: {
    cursor: "pointer",
    userSelect: "none",
    width: "7em",
  },
  link: {
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
      color: blueColor,
  },
  },
}));

export default NavBarStyle;