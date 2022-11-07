import React from 'react';
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from 'axios';
export default function FormTimer(props) {
    const textInput = useRef("");
    const [icon, setIcon] = useState("");
    const [file, setFile] = useState("");

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
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
            <div className='d-flex justify-content-center align-items-center textarea-timer'>
                <textarea className='form-control' ref = {textInput}  defaultValue = {props.item.stepName} onBlur={(onBlur)} onFocus={(onFocus)}></textarea>
                <i onMouseDown = {onDelete} className={icon}></i>
                <input type="file" onChange={handleChange} />
                <img src={file} />
            </div>
        </div>

    );
}