import React from 'react';
import NavBar from "../utilities/navbar"
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function AddTimer(props) {
    let process = useRef([{
        delete: <div></div>,
        text: <textarea placeholder="" className="form-control textarea-timer"></textarea>, 
    }]);
    const [updatedList, setList] = useState(process.current);
    function onClick(e) {
        let newArray = [...process.current];
        newArray.push({
            delete: <div></div>,
            text: <textarea placeholder="" className="form-control textarea-timer"></textarea>
    });
    process.current = newArray;
    setList(process.current);
    }

    function textOnFocus(item) {
        item.item.delete = <i class="bi bi-x"></i>
        setList([...process.current]);
    }
    function textOnBlur(item) {
        item.item.delete = <div></div>;
        setList([...process.current]);
    }

    return(
        <div className="container text-center">
            <NavBar/>
            <h1 className='timer-header'>This page allows the admin to create a timer!</h1>
            <label>Title</label>
            <input className="form-control mb-2"></input>
            <div>{updatedList.map((item, index) =>  {
                return <div  className="mb-2">
                    <div onBlur={()=> {{textOnBlur({item})}}} onFocus={() => {textOnFocus({item})}} className='d-flex justify-content-center align-items-center textarea-timer'>
                    {item.text}
                    {item.delete}</div>
                    </div>})}
            </div>
            <button onClick={onClick} className="btn btn-dark mt-2">+</button>
        </div>
    )
}