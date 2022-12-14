import React from 'react';
import NavBar from "../utilities/navbar"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function TimerHomePage(props) {
    const [timers, setTimers] = useState([]);
    const [title, setTitle] = useState("");
    useEffect(() => {
        getTimer();
    }, [])

    async function getTimer() {
        await axios.get('/api/v1/timer').then(res => {
            setTimers(res.data)
           }).catch(err => console.log(err));

    }
    async function onSubmit(e) {
        e.preventDefault();
        await axios.post('/api/v1/timer', {title: title}).then(res => {
           }).catch(err => console.log(err));
           getTimer();

    }
    function onChange(e) {
        setTitle(e.target.value);

    }
    async function handleRemove(id) {
        await axios.delete('/api/v1/timer', {data: {_id: id}}).then(res => {
           }).catch(err => console.log(err));
           getTimer()
    }
    const list = timers.map((item) => {
        return <li className="list-group-item d-flex justify-content-between align-items-start" key={item._id}><h4 className="live-quiz-item">{item.title}</h4>
        <span>
            <i onClick = {() => handleRemove(item._id)} className="fa-solid fa-trash fa-lg"></i>
            <Link to="/edit-timer" state = {item}><i className="fa-solid fa-pen fa-lg"></i></Link>
        </span>
    </li>
    })

    return (<div>
            <NavBar/>
        <div className='container'>
            <ul className="list-group list-group-flush mt-2">{list}</ul>
            <h1 className='m-3'>Add new Timer</h1>
            <div className='container'>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} className='form-control mb-2'></input> 
                    <button className='btn btn-primary'>+</button>
                </form>
            </div>
        </div>

    </div>);
}