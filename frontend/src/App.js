import logo from './logo.svg';
import './App.css';
//routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './routing/PrivateRoute'
import PublicRoute from './routing/PublicRoute'
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
import ResultsViewerPage from './pages/Professor/ResultsViewerPage';
import StudentSolutionQualityCheckPage from './pages/Professor/StudentSolutionQualityCheckPage';

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
        <PublicRoute exact path="/" ></PublicRoute>
        <Route exact path="/login" component={LoginPage}></Route>
        <PrivateRoute exact path="/professorhome" component={ProfessorHomeDashboard} roleAccess={"professor"}></PrivateRoute>
        <PrivateRoute exact path="/testing" component={TestingPage} roleAccess={"professor"}></PrivateRoute>
        <PrivateRoute exact path="/course" component={ProfessorCoursePage} roleAccess={"professor"}></PrivateRoute>
        <PrivateRoute exact path="/coursecreation" component={AddCoursePage} roleAccess={"professor"}></PrivateRoute>
        <PrivateRoute exact path="/assignmentcreation" component={AssignmentCreation} roleAccess={"professor"}></PrivateRoute>
        <PrivateRoute exact path="/studentinfoview" component={StudentInfoViewPage} roleAccess={"professor"}></PrivateRoute>
        <PrivateRoute exact path="/courseresult" component={CourseResultPage} roleAccess={"professor"}></PrivateRoute>
        <PrivateRoute exact path="/resultviewer" component={ResultsViewerPage} roleAccess={"professor"}></PrivateRoute>
        <PrivateRoute exact path="/studentsolutionqualitycheck" component={StudentSolutionQualityCheckPage} roleAccess={"professor"}></PrivateRoute>

        <PrivateRoute exact path="/studenthome" component={StudentHomeDashboard} roleAccess={"student"}></PrivateRoute>
        <PrivateRoute exact path="/seeallassignment" component={SeeAllAssignmentPage} roleAccess={"student"}></PrivateRoute>
        <PrivateRoute exact path="/studentteams" component={StudentTeamsPage} roleAccess={"student"}></PrivateRoute>
      </Switch>
    </Router>)
    }
  </>
  );
}

export default App;