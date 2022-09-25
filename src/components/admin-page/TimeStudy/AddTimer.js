import React from 'react';
import NavBar from "../utilities/navbar"
import { useState, useEffect } from "react";
import { useRef } from "react";
import FormTimer from './FormTimer';
export default function AddTimer(props) {
    const updatedList = useRef([]);
    const [components, setComponents] = useState([]);
    useEffect(() => {
        console.log("hi")
        const arr = updatedList.current.map((item, index) =>  {
            return <FormTimer updatedList = {updatedList} item = {item} setComponents = {setComponents} components = {components} index = {index} key = {index}/>})
        setComponents(arr)
    }, [updatedList.current]);

    useEffect(() => {
        

    }, [components])
    
    function onClick(e) {
        updatedList.current = [...updatedList.current, ""];
        const arr = updatedList.current.map((item, index) =>  {
            return <FormTimer updatedList = {updatedList} item = {item} setComponents = {setComponents} components = {components} index = {index} key = {index}/>})
        setComponents(arr)
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