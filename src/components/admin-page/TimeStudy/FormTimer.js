import React from 'react';
import { useState, useEffect } from "react";
import { useRef } from "react";
import { components } from 'react-select';
export default function FormTimer(props) {
    const textInput = useRef("");
    const [icon, setIcon] = useState("");

    function onFocus(e) {
        console.log(e)
        console.log(props.components[0]);
        setIcon("bi bi-x")
    }
    function onDelete(e) {
        // const arr = props.components.filter((item) => item != props.item);
        console.log("delete")
        const newArry = [...props.updatedList.current];
        newArry.splice(props.index, 1);
        props.updatedList.current = newArry;
        console.log(props.updatedList)
        // props.setComponents(arr);
        // console.log("delete");
    }
    function onBlur(e) {
        setIcon("");
    }
    function onChange(e) {
        // const arr = 
        // props.updatedList.current[props.index] = textInput;
        // console.log(props.updatedList.current)

    }

    return (
        <div className="mb-2">
            <div className='d-flex justify-content-center align-items-center textarea-timer'>
                <textarea onChange={onChange} ref={textInput} onBlur={(onBlur)} onFocus={(onFocus)}></textarea>
                <i onMouseDown = {onDelete} className={icon}></i>
            </div>
        </div>

    );
}