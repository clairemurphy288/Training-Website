import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Query from './query.js';
import AddUser from './AddUser';
import "./userFeed.css";
import NavBar from '../utilities/navbar.js';
export default function UserFeed() {
    const [users, setUsers] = useState([{__v: 0,
        _id: "",
        maintenancePlan: false,
        password: "",
        email: "",
        quizDash: true,
        timer: false,
        typeOfUser: "standard",
        username: ""}]);
    useEffect(()=> {
        if(users[0]._id === "") {
            getUsers();
        }
    } );
    const [count, setCount] = useState(0);
    const [range, setRange] = useState([count, count+10]);
    const [blankUser, setBlankUser] = useState(
                                <div className="add-user-container">
                                    <h5 className="circle-label">Add a new user</h5>
                                    <i onClick={addUser} class="fa-solid fa-circle-plus fa-xl"></i>
                                </div>)

    useEffect(() => {
        setRange([count*10, count*10 + 10]);
      }, [count]);

    async function getUsers() {
        await axios.get('http://localhost:5000/feed').then(async (res) => {
            const data = await res.data
            setUsers(data);} ).catch(err => console.log(err));

    }
    function decrementPage(e) {
        if (count > 0) {
            setCount(count - 1);
        }

    }
    function incrementPage(e) {
        if (count < numberOfPages - 1) {
            setCount(count + 1);
        }

    }
    function addUser(e) {
        setBlankUser(<AddUser onClick = {addUser} getUsers={getUsers} setBlankUser={setBlankUser}/>)

    }
    let numberOfPages = Math.round(users.length/10);
    let userList = users.slice(range[0], range[1]);
    let listItems = userList.map((user) => <User getUsers={getUsers} key={user._id} _id={user._id} user={user}/>)
    return (<div>
            <NavBar/>
            
                <div className="container">
                <Query getUsers = {getUsers} setUsers = {setUsers}/>
                {blankUser}
                </div>
                <div className= "mb-3 px-3 d-flex justify-content-between">
                    <i onClick={decrementPage} class="fa-solid fa-arrow-left-long fa-xl arrow-icon"></i>
                    <i onClick={incrementPage} class="fa-solid fa-arrow-right-long fa-xl arrow-icon"></i>
                </div>
                <hr></hr>
                <div>{listItems}</div>
                <hr></hr>
                <div className= "mb-3 px-3 d-flex justify-content-between">
                    <i onClick={decrementPage} class="fa-solid fa-arrow-left-long fa-xl arrow-icon"></i>
                    <i onClick={incrementPage} class="fa-solid fa-arrow-right-long fa-xl arrow-icon"></i>
                </div>

            </div>)
}

export function User(props) {
    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [password, setPassword] = useState(props.user.password);
    const [quizView, setQuizView] = useState(props.user.quizDash);
    const [timer, setTimerView] = useState(props.user.timer);
    const [maintenance, setMaintenance] = useState(props.user.maintenancePlan);
    const [selected, setOption] = useState(props.user.typeOfUser);
    
    async function onSubmit(e) {
        e.preventDefault();
        console.log("submit")
        const user = {
            username: username,
            email: email, 
            password: password,
            quizDash: quizView,
            timer: timer,
            maintenancePlan: maintenance,
            typeOfUser: selected
        }
        await axios.post('http://localhost:5000/feed', [user, props._id]).then(async (res) => {
            console.log(res.data);
        } ).catch(err => console.log(err));
        
    }
    async function onClick(e) {
        await axios.post('http://localhost:5000/delete', {_id: props._id}).then(async (res) => {
            console.log(res.data);
        } ).catch(err => console.log(err));
        props.getUsers();
    }
    return (
    <div className="my-5 container user-container">
        <form onSubmit= {onSubmit}>
        <i onClick={onClick}className="fa-solid fa-trash questionDeletion"></i>
            <div className='row'>
                <div class="mb-3 col form-floating">
                    <input onChange={usernameChange} defaultValue={props.user.username} type="text" class="form-control" id="username"></input>
                    <label className="floating-label" htmlFor="username">username</label>
                 </div>
                <div class="mb-3 col form-floating">
                    <input onChange={emailChange} defaultValue={props.user.email} type="text" className="form-control" id="email"></input>
                    <label className="floating-label" htmlFor="email">email</label>
                </div>
            </div>
            <div className="row">
            <div class="col mb-3 form-floating">
                <input onChange={passwordChange} defaultValue={props.user.password} type="text" class="form-control" id="password"></input>
                <label className="floating-label" htmlFor="password">password</label>
            </div>
            </div>

            <select className="form-select" value={selected} onChange={setPrivilege}>
                <option value="admin">Admin</option>
                <option value="standard" >Standard</option>
            </select>
            <div className="my-1">
                <div className="form-check form-switch">
                    <input onChange={setQuiz} checked={quizView}className="form-check-input" type="checkbox" value="" id="quizDash"></input>
                    <label className="form-check-label check-label" htmlFor="quizDash">quiz dashboard</label>
                </div>
                <div className="form-check form-switch">
                    <input onChange={setTimer} checked={timer} className="form-check-input" type="checkbox" value="" id="timeStudy"></input>
                    <label className="form-check-label check-label" htmlFor="timeStudy">time study</label>
                </div>
                <div className="form-check form-switch">
                    <input onChange={setMaintenancePlan} checked={maintenance} className="form-check-input" type="checkbox" value="" id="maintenancePlan"></input>
                    <label className="form-check-label check-label" htmlFor="maintenancePlan">maintenance plan</label>
                </div>
            </div>
            <button className="btn btn-dark my-1" type="submit">Submit Changes</button>
        </form>
    </div>)
    // Helper Functions
        function usernameChange(e) {
            console.log(props.user)
            setUsername(e.target.value);
        }
        function passwordChange(e) {
            setPassword(e.target.value)
        }
        function emailChange(e) {
            setEmail(e.target.value);
        }
        function setQuiz(e) {
            setQuizView(!quizView);
    
        }
        function setTimer(e) {
            setTimerView(!timer);
    
        }
        function setMaintenancePlan(e) {
            setMaintenance(!maintenance);
            
        }
        function setPrivilege(e) {
            setOption(e.target.value);
        }
}