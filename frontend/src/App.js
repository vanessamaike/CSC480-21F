import logo from './logo.svg';
import './App.css';
//routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './routing/PrivateRoute'
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

import StudentHomeDashboard from './pages/Student/StudentHomeDashboard';
import SeeAllAssignmentPage from './pages/Student/SeeAllAssignmentPage';
import StudentTeamsPage from './pages/Student/StudentTeamsPage';
import {isMobile} from 'react-device-detect';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import AssignmentViewer from './pages/Professor/AssignmentViewer';

function App() {
  const getUser = useSelector(selectUser)
  const {user, isAuthenticated} = getUser
  return (
  <>
    { isMobile == true ? (
      <div> This content is unavailable on mobile</div>
    ) : (
      <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage}></Route>
        <PrivateRoute exact path="/professorhome" component={ProfessorHomeDashboard} isAuthenticated={isAuthenticated}></PrivateRoute>
        <PrivateRoute exact path="/testing" component={TestingPage} isAuthenticated={isAuthenticated}></PrivateRoute>
        <PrivateRoute exact path="/course" component={ProfessorCoursePage} isAuthenticated={isAuthenticated}></PrivateRoute>
        <PrivateRoute exact path="/coursecreation" component={AddCoursePage} isAuthenticated={isAuthenticated}></PrivateRoute>
        <Route exact path="/assignmentcreation" component={AssignmentCreation} isAuthenticated={isAuthenticated}></Route>
        <Route exact path="/assignmentviewer" component={AssignmentViewer} ></Route>
        <PrivateRoute exact path="/studentinfoview" component={StudentInfoViewPage} isAuthenticated={isAuthenticated}></PrivateRoute>
        <PrivateRoute exact path="/courseresult" component={CourseResultPage} isAuthenticated={isAuthenticated}></PrivateRoute>
        <PrivateRoute exact path="/resultviewer" component={ResultsViewerPage} isAuthenticated={isAuthenticated}></PrivateRoute>
        <PrivateRoute exact path="/studenthome" component={StudentHomeDashboard} isAuthenticated={isAuthenticated}></PrivateRoute>
        <PrivateRoute exact path="/seeallassignment" component={SeeAllAssignmentPage} isAuthenticated={isAuthenticated}></PrivateRoute>
        <PrivateRoute exact path="/studentteams" component={StudentTeamsPage} isAuthenticated={isAuthenticated}></PrivateRoute>
      </Switch>
    </Router>)
    }
  </>
  );
}

export default App;