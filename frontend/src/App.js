import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Custom Pages
import HomePage from "./pages/Home/HomePage"
import LoginPage from './pages/Login/LoginPage';
import ProfessorHomeDashboard from './pages/Professor/ProfessorHomeDashboard';
import TestingPage from './pages/TestingPage';



function App() {

  
  return (
    <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/home" component={ProfessorHomeDashboard}></Route>
          <Route exact path="/testing" component={TestingPage}></Route>
        </Switch>
    </Router>
  );
}

export default App;