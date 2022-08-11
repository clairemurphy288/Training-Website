import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './sign-up.css';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState("password");
    

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
        console.log("submitted!")
        e.preventDefault();
        const user = {
            username: username,
            password: password,
            email: email
        }
        console.log(user);
        axios.post('http://localhost:5000',user).then(res => {
        if (res.data) {
            console.log("attempting to redirect to dashboard")
        } else {
            console.log("problem")
        }
    });
    }
    function changeIcon(e) {
        e.currentTarget.classList.toggle("bi-eye-slash");
        e.currentTarget.classList.toggle("bi-eye");
        passwordVisibility === "password" ? setPasswordVisibility("text") : setPasswordVisibility("password")
    }
        return (
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
                        <p className='sign-in-p'><Link to="/dashboard">Dashboard</Link></p>
                        <p className='sign-in-p'><Link to="/questions">Questions</Link></p>
                    </div>
                </div>
            </form>


        );
}
