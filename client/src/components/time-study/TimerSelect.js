import Navbar from "../quiz/navbar/quiznavbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "../quiz/navbar/quiznavbar";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function TimerSelect() {
    const [timers, setTimers] = useState([]);
    const [selected, setSelected] = useState(0);
    const [selectedTimer, setSelectedTimer] = useState([]);


    const navigate = useNavigate();

    useEffect(()=> {
        getTimers();

    }, []);
    useEffect(()=> {
        if (selectedTimer.length != 0) {
            navigate("/timer",{state: {process: selectedTimer, title:timers[selected].title}})

        }


    },[selectedTimer])

    async function getTimers() {
        await axios.get("/api/v1/timer").then(function (res) {
            setTimers(res.data);
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    async function getSelectedTimer() {
        const timer = timers[selected];
        console.log(timer)
        await axios.get('/api/v1/step', {params: {_id: timer._id}}).then(res => {
            console.log(res.data)
            setSelectedTimer(res.data);
           }).catch(err => console.log(err));


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
                            <Link onClick={getSelectedTimer} style={{ textDecoration: 'none' }}><button id='quiz-button-sub' type="submit">SUBMIT</button></Link>
                        </div>

    </div>
    </div>);
}