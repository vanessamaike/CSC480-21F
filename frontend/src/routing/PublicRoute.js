import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom'

function PublicRoute({ component: Component, isAuthenticated, ...children }) {
    console.log(isAuthenticated)
    if (isAuthenticated === true) {
      return <Redirect to="professorhome" />;
    }
    return <Redirect to="login" />;
  }
  
export default PublicRoute;