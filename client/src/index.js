import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import axios from "axios";

if (process.env.NODE_ENV === "development") {
  console.log("setting default url")
  axios.defaults.baseURL = 'http://localhost:3000';
  console.log(axios.defaults.baseURL)
} 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


