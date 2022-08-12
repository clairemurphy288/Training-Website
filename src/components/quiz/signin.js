import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import './sign-up.css';

export default function Signin(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState("password");

    function onChangeUsername(e) {
            setUsername(e.target.value)

    }
    function onChangePassword(e) {
            setPassword(e.target.value)
    }

    //validates signin with get request
    async function onSubmit(e) {
        e.preventDefault();
        console.log("sent");
        const user = {
            username: username,
            password: password
        }
        console.log(user);
        await axios.post('http://localhost:5000/login',user)
        .then(res => { console.log(res.data);
        });  
    }

    function changeIcon(e) {
        e.currentTarget.classList.toggle("bi-eye-slash");
        e.currentTarget.classList.toggle("bi-eye");
        passwordVisibility === "password" ? setPasswordVisibility("text") : setPasswordVisibility("password")
    }

        return (
            <form onSubmit = {onSubmit}>
                <div class="sign-in-holder">
                    <div className="sign-in-container">
                        <h2 className='sign-in-heading'>LOGIN</h2>

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
                        <button type="submit" className="sign-in-btn-sub">login</button>
                        <p className='sign-in-p'>Don't have an account? <Link to ="/">SIGN UP</Link></p>
                    </div>
                </div>
            </form>

        );
    
}