import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Custom Pages
import HomePage from "./pages/Home/HomePage"
import LoginPage from './pages/Login/LoginPage';
import ProfessorHomeDashboard from './pages/Professor/ProfessorHomeDashboard';

import TestingPage from './pages/Test';
import ProfessorCoursePage from './pages/Professor/ProfessorCoursePage';
import AddCoursePage from './pages/Professor/AddCoursePage';
import AssignmentCreation from './pages/Professor/AssignmentCreation';
import StudentInfoViewPage from './pages/Professor/StudentInfoViewPage';
import CourseResultPage from './pages/Professor/CourseResultPage';
import ResultsViewerPage from './pages/Professor/ResultsViewerPage';

import StudentHomeDashboard from './pages/Student/StudentHomeDashboard';
import SeeAllAssignmentPage from './pages/Student/SeeAllAssignmentPage';
import StudentTeamsPage from './pages/Student/StudentTeamsPage';
import {isMobile} from 'react-device-detect';

function App() {

  return (
  <>
    { isMobile == true ? (
      <div> This content is unavailable on mobile</div>
    ) : (
      <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/professorhome" component={ProfessorHomeDashboard}></Route>
        <Route exact path="/testing" component={TestingPage}></Route>
        <Route exact path="/course" component={ProfessorCoursePage}></Route>
        <Route exact path="/coursecreation" component={AddCoursePage}></Route>
        <Route exact path="/assignmentcreation" component={AssignmentCreation}></Route>
        <Route exact path="/studentinfoview" component={StudentInfoViewPage}></Route>
        <Route exact path="/courseresult" component={CourseResultPage}></Route>
        <Route exact path="/resultviewer" component={ResultsViewerPage}></Route>

        <Route exact path="/studenthome" component={StudentHomeDashboard}></Route>
        <Route exact path="/seeallassignment" component={SeeAllAssignmentPage}></Route>
        <Route exact path="/studentteams" component={StudentTeamsPage}></Route>
      </Switch>
    </Router>)
    }
  </>
  );
}

export default App;