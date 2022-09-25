import React from 'react';
import NavBar from "../utilities/navbar"
import { useState, useEffect } from "react";
import { useRef } from "react";
import FormTimer from './FormTimer';
import { components } from 'react-select';
import { set } from 'mongoose';

export default function AddTimer(props) {
    const [updatedList, setList] = useState([]);
    const [components, setComponents] = useState([]);
    useEffect(() => {
        const arr = updatedList.map((item, index) =>  {
            return <FormTimer setComponents = {setComponents} components = {components} index = {index} key = {index}/>})
        setComponents(arr)
    }, [updatedList]);

    
    function onClick(e) {
        const newKey = components.length == 0? 0 : components[components.length - 1].key + 1;
        const arr = [...components, <FormTimer setComponents = {setComponents} components = {components} index = {newKey} key = {newKey}/>];
        setComponents(arr);


    }


    return(
        <div className="container text-center">
            <NavBar/>
            <h1 className='timer-header'>This page allows the admin to create a timer!</h1>
            <label>Title</label>
            <input className="form-control mb-2"></input>
            <div>{components}
            </div>
            <button onClick={onClick} className="btn btn-dark mt-2">+</button>
        </div>
    )
}