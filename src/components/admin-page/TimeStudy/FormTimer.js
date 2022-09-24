import React from 'react';
import { useState, useEffect } from "react";
export default function FormTimer(props) {
    const [icon, setIcon] = useState("");

    function onFocus(e) {
        setIcon("bi bi-x")
    }
    function onDelete(e) {
        console.log("delete");
    }
    function onBlur(e) {
        setIcon("");
    }
    return (
        <div className="mb-2">
            <div className='d-flex justify-content-center align-items-center textarea-timer'>
                <textarea onBlur={(onBlur)} onFocus={(onFocus)}></textarea>
                <i onMouseDown = {onDelete} className={icon}></i>
            </div>
        </div>

    );
}