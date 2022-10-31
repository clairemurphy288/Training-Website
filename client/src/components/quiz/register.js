import React, {Component} from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './sign-up.css';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import bcrypt from 'bcryptjs';
import Alert from '../admin-page/utilities/alert';




export default function Register(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordVisibility, setPasswordVis] = useState(""); 
    const [alert, setAlert] = useState(false);

    function onChangeUsername(e) {
            setUsername(e.target.value);
    }
    function onChangePassword(e) {
        setPassword(e.target.value);
    }
    
    function onChangeEmail(e) {
            setEmail(e.target.value);
    }
    function onSubmit(e) {
        //prevents submission of default values
        e.preventDefault();

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                const user = {
                    username: username,
                    password: hash,
                    email: email
                }
                axios.post('/api/v1',user).then(res => {
                    console.log(res.data);
                    if (res.data.code == 11000) {
                        setAlert(<Alert color = "danger" Title="Invalid Credentials" innerText="Invalid credentials. Please check your username and password."/> );

                    } else if (res.data.errors != undefined) {
                        setAlert(<Alert color = "warning" Title="Invalid Credentials" innerText={res.data.message}/> );
                    } else {
                        localStorage.setItem('currentUser', res.data );
                        

                    }
                }).catch(err => {console.log(err)});

            });
        });
    
    }
  
    function changeIcon(e) {
        e.currentTarget.classList.toggle("bi-eye-slash");
        e.currentTarget.classList.toggle("bi-eye");
        passwordVisibility === "password" ? setPasswordVis("text") : setPasswordVis("password");
    }
        return (
        <div>
            {alert == false? false : alert}
            <form onSubmit = {onSubmit}>
                <div className="sign-in-holder">
                    <div className="sign-in-container">
                        <h2 className='sign-in-heading'>SIGN-UP</h2>

                            <div className="sign-in-field">
                                <label htmlFor="exampleInputusername" className="sign-in-form-label">USERNAME</label>
                                <input value={username} onChange={onChangeUsername} className="sign-in-form-control" id="exampleInputUsername" aria-describedby="emailHelp"></input>
                            </div>
                            <div className="sign-in-field">
                                <p>
                                    <label htmlFor="exampleInputPassword1" className="sign-in-form-label">PASSWORD</label>
                                    <input value={password} onChange={onChangePassword}  type={passwordVisibility} className="sign-in-form-control" id="exampleInputPassword1"></input>
                                    <i onClick={changeIcon} class="bi bi-eye-slash" id="toggle-icon"></i>
                                </p>
                            </div>
                            <div className='sign-in-field'>
                                <label htmlFor='exampleInputEmail' className='sign-in-form-label'>EMAIL</label>
                                <input value={email} onChange={onChangeEmail} className='sign-in-form-control' id='exampleInputEmail'></input>
                            </div>
                        <button type="submit" className="sign-in-btn-sub">Sign-Up</button>
                        <p className='sign-in-p'>Already have an account? <Link to ="/signin">SIGN IN</Link></p>
                    </div>
                </div>
            </form>
        </div>


        );
    
}
