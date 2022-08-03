import { useState, useEffect } from "react";
import axios from 'axios';
export default function AddUser(props) {
    //There has to be a simpler way! I want to ditch all these state hooks.
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [quizView, setQuizView] = useState(true);
    const [timer, setTimerView] = useState(false);
    const [maintenance, setMaintenance] = useState(false);
    const [selected, setOption] = useState("standard");

    function onClick(e) {
        props.setBlankUser(<div className="add-user-container"><h5 className="circle-label">Add a new user</h5>
        <i onClick={props.onClick} class="fa-solid fa-circle-plus fa-xl"></i></div>)
    }
    async function onSubmit(e) {
        e.preventDefault();
        const user = {
            username: username,
            email: email, 
            password: password,
            quizDash: quizView,
            timer: timer,
            maintenancePlan: maintenance,
            typeOfUser: selected
        }
        await axios.post('http://localhost:5000/', {user: user}).then(async (res) => {
            console.log(res.data);
        } ).catch(err => console.log(err));
        props.getUsers();
        props.setBlankUser(<h1>User Added!</h1>)

    }
    return(
    <div>
        <div className="container">
        <form onSubmit= {onSubmit}>
        <i onClick={onClick}className="fa-solid fa-trash questionDeletion"></i>
            <div className='row'>
                <div class="mb-3 col">
                    <label htmlFor="username" class="form-label">username</label>
                    <input onChange={usernameChange}type="text" class="form-control" id="username"></input>
                 </div>
                <div class="mb-3 col">
                    <label htmlFor="email" className="form-label">email</label>
                    <input onChange={emailChange}type="text" className="form-control" id="email"></input>
                </div>
            </div>
            <div className="row">
            <div class="col mb-3">
                <label htmlFor="password" class="form-label">password</label>
                <input onChange={passwordChange}type="text" class="form-control" id="password"></input>
            </div>
            </div>

            <select className="form-select" value={selected} onChange={setPrivilege}>
                <option value="admin">Admin</option>
                <option value="standard" >Standard</option>
            </select>



            
            <div className="form-check form-switch">
                <input onChange={setQuiz} checked={quizView}className="form-check-input" type="checkbox" value="" id="quizDash"></input>
                <label className="form-check-label" htmlFor="quizDash">quiz dashboard</label>
            </div>
            <div className="form-check form-switch">
                <input onChange={setTimer} checked={timer} className="form-check-input" type="checkbox" value="" id="timeStudy"></input>
                <label className="form-check-label" htmlFor="timeStudy">time study</label>
            </div>
            <div className="form-check form-switch">
                <input onChange={setMaintenancePlan} checked={maintenance} className="form-check-input" type="checkbox" value="" id="maintenancePlan"></input>
                <label className="form-check-label" htmlFor="maintenancePlan">maintenance plan</label>
            </div>
            <button className="btn btn-dark" type="submit">Add</button>
            <hr></hr>
        </form>
    </div>
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