import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
function PublicRoute({ component: Component, roleAccess, ...children }) {

  const getUser = useSelector(selectUser)
  const {user, isAuthenticated} = getUser
  console.log(isAuthenticated)

    console.log(isAuthenticated)
    if (isAuthenticated === true) {
      if(roleAccess === "professor" ){
        return <Redirect to="professorhome" />;
      } else {
        return <Redirect to="studenthome" />;
      }
    }
    return <Redirect to="login" />;
  }
  
export default PublicRoute;