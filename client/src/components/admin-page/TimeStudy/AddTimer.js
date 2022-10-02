import React from 'react';
import NavBar from "../utilities/navbar"
import { useState, useEffect } from "react";
import { useRef } from "react";
import FormTimer from './FormTimer';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
export default function AddTimer(props) {
    const location = useLocation();
    const  timer  = location.state;
    const [process, setProcess] = useState([]);

    useEffect(() => {
        getNewProcess()

    }, [])

    async function getNewProcess() {
        await axios.get('http://localhost:5000/step', {params: {_id: timer._id}}).then(res => {
            console.log(res.data)
            setProcess(res.data);
           }).catch(err => console.log(err));
    }

    async function onClick(e) {
        await axios.post('http://localhost:5000/step', {_id: timer._id}).then(res => {
           }).catch(err => console.log(err));
           getNewProcess();

    }
    const list = process.map((item, index) =>  {
        return <FormTimer getNewProcess = {getNewProcess} timerId = {timer._id}  item = {item}  key = {item._id}/>})

    return(
        <div className="container text-center">
            <NavBar/>
            <h1 className='timer-header'>This page allows the admin to create a timer!</h1>
            <label>Title</label>
            <input className="form-control mb-2"></input>
            <div>{list}</div>
            <button onClick={onClick} className="btn btn-dark mt-2">+</button>
        </div>
    )
}