import React from 'react';
import { useState, useEffect } from "react";
import { useRef } from "react";
import { NavItem } from 'react-bootstrap';
import { components } from 'react-select';
export default function FormTimer(props) {
    const textInput = useRef("");
    const [icon, setIcon] = useState("");

    function onFocus(e) {
        setIcon("bi bi-x")
    }
    function onDelete(e) {
    }
    function onBlur(e) {
        setIcon("");
    }
    function onChange(e) {


    }

    return (
        <div className="mb-2">
            <div className='d-flex justify-content-center align-items-center textarea-timer'>
                <textarea onChange={onChange}  defaultValue = {props.item.stepName} onBlur={(onBlur)} onFocus={(onFocus)}></textarea>
                <i onMouseDown = {onDelete} className={icon}></i>
            </div>
        </div>

    );
}