
import NavBar from "../utilities/navbar"
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function AddTimer(props) {
    let process = useRef([{
        text: <textarea className="form-control"></textarea>, 
        button: <button onClick={onClick} className="btn btn-dark mt-2">+</button>
    }]);
    const [updatedList, setList] = useState(process.current);
    function onClick(e) {
        let newArray = [...process.current];
        delete newArray[newArray.length - 1].button;
        newArray.push({
            text: <textarea className="form-control"></textarea>, 
            button:<button onClick={onClick} className="btn btn-dark mt-2">+</button>
    });
    process.current = newArray;
    setList(process.current);
    }

    function textOnFocus(e) {
        console.log(e.target);

    }

    return(
        <div className="container text-center">
            <NavBar/>
            <h1>This page allows the admin to create a timer!</h1>
            <input className="form-control mb-2"></input>
            <div>{updatedList.map((item, index) =>  {return <div onFocus={textOnFocus} className="mb-2">{item.text}{item.button}</div>})}</div>
        </div>
    )
}