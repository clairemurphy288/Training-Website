import Navbar from "../quiz/navbar/quiznavbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "../quiz/navbar/quiznavbar";
import { Link } from "react-router-dom";

export default function TimerSelect() {
    const [timers, setTimers] = useState([]);
    const [selected, setSelected] = useState(0);

    useEffect(()=> {
        getTimers();

    }, [])

    async function getTimers() {
        await axios.get("/api/v1/timer").then(function (res) {
            setTimers(res.data);
            console.log(res.data);
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    function _handleChange(e) {
        setSelected(e.target.value)

    }


    const items = timers.map((object, index) => <option value={index}>{object.title}</option>);
    return (
    <div>
        <Navbar />
                    <div className='quiz-holder'>
                        <div className='quiz-selector-section'>
                            <div>
                                <label className='quiz-form-label'>Choose a process:</label>
                                <select className="form-select" id='quiz-form-select' value={selected} onChange={_handleChange}>
                                    {items}
                                </select>
                            </div>
                            <Link to="/timer" state={{timer: timers[selected]}} style={{ textDecoration: 'none' }}><button id='quiz-button-sub' type="submit">SUBMIT</button></Link>
                        </div>

    </div>
    </div>);
}