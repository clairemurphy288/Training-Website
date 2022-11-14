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
        await axios.get('/api/v1/step', {params: {_id: timer._id}}).then(res => {
            setProcess(res.data);
           }).catch(err => console.log(err));
    }

    async function onClick(e) {
        await axios.post('/api/v1/step', {_id: timer._id}).then(res => {
           }).catch(err => console.log(err));
           getNewProcess();

    }
    async function updateTitle(e) {
        if (e.target.value != timer.title) {
            await axios.put('/api/v1/timer',  {_id: timer._id, title: e.target.value}).then(res => {
            }).catch(err => console.log(err));

        }
    }
    
    const list = process.map((item, index) =>  {
        let base64String;
        console.log(item)
        if (item.image != undefined) {

            base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''));

            // base64String = btoa(String.fromCharCode(...new Uint8Array(item.image.data.data)))
        } else {
            base64String = "";
        }
        return <FormTimer imageSource = {`data:image/png;base64,${base64String}`} getNewProcess = {getNewProcess} timerId = {timer._id}  item = {item}  key = {item._id}/>})

    return(
        <div className="container text-center">
            <NavBar/>
            <label>Title</label>
            <input onBlur={updateTitle} defaultValue={timer.title} className="form-control mb-2"></input>
            <div>{list}</div>
            <button onClick={onClick} className="btn btn-dark mt-2">+</button>
        </div>
    )
}