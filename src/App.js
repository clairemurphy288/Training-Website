import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login.js";
import Admin from "./components/admin-page/admin.js"
import Edit from "./components/admin-page/Edit"
import UserFeed from './components/admin-page/users/userFeed'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element = {<Login/>}/>
      <Route path="/admin" element = {<Admin/>}/>
      <Route path='/edit/:query/:page' element={<Edit/>}/>
      <Route path="/user" element={<UserFeed/>}/>
      </Routes>
    </Router>
 
  );
}

export default App;
