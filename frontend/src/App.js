import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//Custom Pages
import HomePage from "./pages/Home/HomePage"
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={LoginPage}></Route>
        </Switch>
    </Router>
  );
}

export default App;