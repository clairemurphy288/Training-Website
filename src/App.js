import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from "./components/quiz/login.js";
import Admin from "./components/admin-page/admin.js"
import Edit from "./components/admin-page/Edit"
import UserFeed from './components/admin-page/users/userFeed'
import Signin from "./components/quiz/signin";
import Dashboard from "./components/quiz/dashboard";
import Quiz from "./components/quiz/quiz";
import Questions from "./components/quiz/questions";
import AddTimer from "./components/admin-page/TimeStudy/AddTimer.js";
import Scores from "./components/quiz/scores";
import Timer from "./components/time-study/timer";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element = {<Login/>}/>
      <Route path="/admin" element = {<Admin/>}/>
      <Route path='/edit/:query/:page' element={<Edit/>}/>
      <Route path="/user" element={<UserFeed/>}/>
      <Route path="/signin" element = {<Signin/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/quiz" element = {<Quiz/>}/>
      <Route path="/questions" element = {<Questions/>}/>
      <Route path="/add-timer" element={<AddTimer/>}/>
      <Route path="/scores" element={<Scores/>}/>
      <Route path="/timer" element={<Timer/>}/>
      </Routes>
    </Router>
 
  );
}

export default App;
