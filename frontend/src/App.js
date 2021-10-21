import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Custom Pages
import HomePage from "./pages/Home/HomePage"
import LoginPage from './pages/Login/LoginPage';
import ProfessorHomeDashboard from './pages/Professor/ProfessorHomeDashboard';
import TestingPage from './pages/TestingPage';
import ProfessorCoursePage from './pages/Professor/ProfessorCoursePage';
import AddCoursePage from './pages/Professor/AddCoursePage';
import AssignmentCreation from './pages/Professor/AssignmentCreation';
import StudentInfoViewPage from './pages/Professor/StudentInfoViewPage';
import CourseResultPage from './pages/Professor/CourseResultPage';
function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/home" component={ProfessorHomeDashboard}></Route>
        <Route exact path="/testing" component={TestingPage}></Route>
        <Route exact path="/course" component={ProfessorCoursePage}></Route>
        <Route exact path="/coursecreation" component={AddCoursePage}></Route>
        <Route exact path="/assignmentcreation" component={AssignmentCreation}></Route>
        <Route exact path="/studentinfoview" component={StudentInfoViewPage}></Route>
        <Route exact path="/courseresult" component={CourseResultPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;