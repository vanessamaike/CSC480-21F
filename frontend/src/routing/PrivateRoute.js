import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
function PrivateRoute({ component: Component, roleAccess, ...children }) {

  const getUser = useSelector(selectUser)
  const {user, isAuthenticated} = getUser
  console.log(isAuthenticated)

    if (isAuthenticated === true) {
      if(roleAccess === user.role){
        return <Route {...children} render={props => <Component {...props} />} />;
      }
      else{
        if(user.role === "professor"){
          return <Redirect to="professorhome" />;
        }
        else{
          return <Redirect to="studenthome" />;
        }
      }
      
    }

    return <Redirect to="login" />;
  }
  
export default PrivateRoute;