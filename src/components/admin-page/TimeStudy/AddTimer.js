import React from 'react';
import NavBar from "../utilities/navbar"
import { useState, useEffect } from "react";
import { useRef } from "react";
import FormTimer from './FormTimer';

export default function AddTimer(props) {
    let process = useRef([]);
    const [updatedList, setList] = useState(process.current);
    
    function onClick(e) {
        let newArray = [...process.current];
        newArray.push('');
    process.current = newArray;
    setList(process.current);
    }


    return(
        <div className="container text-center">
            <NavBar/>
            <h1 className='timer-header'>This page allows the admin to create a timer!</h1>
            <label>Title</label>
            <input className="form-control mb-2"></input>
            <div>{updatedList.map((item, index) =>  {
                return <FormTimer/>})}
            </div>
            <button onClick={onClick} className="btn btn-dark mt-2">+</button>
        </div>
    )
}