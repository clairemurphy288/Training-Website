
import NavBar from "../utilities/navbar"
import { useState, useEffect } from "react";

export default function AddTimer(props) {
    const [process, setProcess] = useState([{
        text: <textarea className="form-control"></textarea>, 
        button: <button onClick={onClick} className="btn btn-dark mt-2">+</button>
    }]);
    const [updatedList, setList] = useState([])
    useEffect(() => {
        setList(process.map((item) =>  {return <div>{item.text}{item.button}</div>}))
    }, [process])
    function onClick(e) {
        let newArray = [...process];
        newArray.push({
            text: <textarea className="form-control"></textarea>, 
            button:<button onClick={onClick} className="btn btn-dark mt-2">+</button>
    })
    console.log(newArray);
    setProcess(newArray);
    }

    return(
        <div className="container text-center">
            <NavBar/>
            <h1>This page allows the admin to create a timer!</h1>
            <input className="form-control mb-2"></input>
            <div>{updatedList}</div>
            

        </div>
    )
}