import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import Register from "./components/quiz/register.js";
import Admin from "./components/admin-page/admin.js"
import Edit from "./components/admin-page/Edit"
import UserFeed from './components/admin-page/users/userFeed'
import Signin from "./components/quiz/signin";
import Dashboard from "./components/quiz/dashboard";
import Quiz from "./components/quiz/quiz";
import Questions from "./components/quiz/questions";
import TimerHomePage from "./components/admin-page/TimeStudy/TimerHomePage";
import Scores from "./components/quiz/scores";
import Timer from "./components/time-study/timer";
import AddTimer from "./components/admin-page/TimeStudy/AddTimer.js";
import TimerSelect from "./components/time-study/TimerSelect.js";
import DataVisualization from "./components/admin-page/TimeStudy/DataVisualization.js";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element = {<Register/>}/>
      <Route path="/admin" element = {<Admin/>}/>
      <Route path='/edit/:query/:page' element={<Edit/>}/>
      <Route path="/user" element={<UserFeed/>}/>
      <Route path="/signin" element = {<Signin/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/quiz" element = {<Quiz/>}/>
      <Route path="/questions" element = {<Questions/>}/>
      <Route path="/add-timer" element={<TimerHomePage/>}/>
      <Route path="/edit-timer" element={<AddTimer/>}/>
      <Route path="/scores" element={<Scores/>}/>
      <Route path="/timer" element={<Timer/>}/>
      <Route path="/select-timer" element={<TimerSelect/>}/>
      <Route path="/data-visualization" element={<DataVisualization/>}/>
      </Routes>
    </Router>
 
  );
}

export default App;
