import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Collapse, Grid, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser, selectUserName, setUser } from "../../features/userSlice";
import professorLogo from "../../images/professor_logo.png";
import studentLogo from "../../images/student_logo.png";
// styled components
import NavBarStyle from "../../styles/NavBarStyle";
import { darkColor, whiteColor } from "../../styles/Style";
import CustomizedContainer from "../CustomizedContainer";
function NavBar({ history }) {
  const dispatch = useDispatch();
  const nav = NavBarStyle();
  const getUser = useSelector(selectUser);
  const getUserName = useSelector(selectUserName);
  const { user, isAuthenticated, role } = getUser;
  const handleLogOut = () => {
    dispatch(setUser());
  };
  const [dropdown, setDropdown] = React.useState(false);
  const handleSignOut = () => {
    handleLogOut();
    sessionStorage.clear();
  };
  const handleClick = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className={nav.root}>
      <AppBar
        style={{
          backgroundColor: whiteColor,
          color: darkColor,
          flexDirection: "row",
        }}
        className={nav.appBar}
      >
        <CustomizedContainer>
          <Grid
            container
            rowSpacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            
            {user.role === "professor" ? (
              <>
              <Grid item xs={2}>
              <Link
                to="/professorhome"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <img className={nav.logo} src={`${professorLogo}`} />
              </Link>
            </Grid>
              <Grid
                item
                container
                xs={8}
                rowSpacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Stack direction="row" spacing={3} sx={{ paddingTop: "16px" }}>
                  <Link
                    to="/course"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ display: "flex", alignItems: "center" }}
                      className={nav.link}
                    >
                      <div>Courses & Assignments</div>
                      <AiOutlinePlusCircle />
                    </Stack>
                  </Link>
                  <Link
                    to="/courseresult"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <div className={nav.link}>Quality Check</div>
                  </Link>
                  <Link
                    to="/studentinfoview"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <div className={nav.link}>Students & Teams</div>
                  </Link>
                </Stack>
              </Grid>
              </>
            ) : (
              <>
              <Grid item xs={2}>
              <Link
                to="/studenthome"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <img className={nav.logo} src={`${studentLogo}`} />
              </Link>
            </Grid>
              <Grid
                item
                container
                xs={8}
                rowSpacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Stack direction="row" spacing={3} sx={{ paddingTop: "16px" }}>
                  <Link
                    to="/seeallassignment"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ display: "flex", alignItems: "center" }}
                      className={nav.link}
                    >
                      <div>Assignments</div>
                      <AiOutlinePlusCircle />
                    </Stack>
                  </Link>
                  <Link
                    to="/studentresults"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <div className={nav.link}>Results</div>
                  </Link>
                  <Link
                    to="/studentteams"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <div className={nav.link}>Teams </div>
                  </Link>
                </Stack>
              </Grid>
              </>
            )}

            <Grid
              item
              container
              xs={2}
              rowSpacing={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Stack
                direction="column"
                spacing={3}
                sx={{ paddingTop: "16px", position: "relative" }}
              >
                <Stack direction="row">
                  <Button
                    onClick={handleClick}
                    sx={{ color: "#000",textTransform: "unset",width: "130px" }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    {getUserName}
                  </Button>
                </Stack>
                <Collapse
                  in={dropdown}
                  timeout="auto"
                  unmountOnExit
                  sx={{ position: "absolute", top: "50px" }}
                >
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <Button
                      variant="contained"
                      className={nav.link}
                      sx={{ width: "130px" }}
                      onClick={handleSignOut}
                    >
                      Sign out
                    </Button>
                  </Link>
                </Collapse>
              </Stack>
            </Grid>
          </Grid>
        </CustomizedContainer>
      </AppBar>
    </div>
  );
}

export default NavBar;
