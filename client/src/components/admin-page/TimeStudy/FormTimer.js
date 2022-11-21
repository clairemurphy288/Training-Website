import React from 'react';
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from 'axios';
export default function FormTimer(props) {
    const textInput = useRef("");
    const [icon, setIcon] = useState("");
    const [file, setFile] = useState(props.imageSource);

    async function handleChange(e) {
        const img = e.target.files[0];
        setFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("testImage", img);
        //try to send in _id in the params!
        await axios.post('/api/v1/image/' + props.item._id, formData, {}).then(res => {
        }).catch(err => console.log(err));
        //post request to upload file
    }


    function onFocus(e) {
        setIcon("bi bi-x")
    }
    async function onDelete(e) {
        await axios.delete('/api/v1/step', {data: {_id: props.item._id, timerId: props.timerId}}  ).then(res => {
           }).catch(err => console.log(err));
        props.getNewProcess();
    }
    async function onBlur(e) {
        setIcon("");
        await axios.put('/api/v1/step',  {_id: props.item._id, text: textInput.current.value}).then(res => {
           }).catch(err => console.log(err));
    }
    return (
        <div className="mb-2">
                    <div className="form-timer">
                        <div className='add-step'>
                            <textarea className='form-control' ref = {textInput}  defaultValue = {props.item.stepName} onBlur={(onBlur)} onFocus={(onFocus)}></textarea>
                        </div>
                        <div className='delete-timer-form'>
                            <i onMouseDown = {onDelete} className={icon}></i>
                        </div>
                        <div className='add-photo'>
                            <input className="mt-2" type="file" onChange={handleChange} />
                            <img className='admin-photo' src={file} />
                        </div>
                    </div>
        </div>

    );
}