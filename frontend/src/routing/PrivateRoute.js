import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
function PrivateRoute({ component: Component, roleAccess, ...children }) {

  const getUser = useSelector(selectUser)
  const {user, isAuthenticated} = getUser
  console.log(isAuthenticated)

    if (isAuthenticated === true && roleAccess === user.role) {
      return <Route {...children} render={props => <Component {...props} />} />;
    }
    return <Redirect to="login" />;
  }
  
export default PrivateRoute;