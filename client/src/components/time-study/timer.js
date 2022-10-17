import {useState, useEffect} from 'react';
import React, {Component} from 'react';
import "./timer.css"
import Navbar from "../quiz/navbar/quiznavbar";
import {useLocation} from 'react-router-dom';
import Alert from "../admin-page/utilities/alert"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Timer(props) { 

    

    //state for the different timers
    const [totalTime, setTotal] = useState(0);
    const [lastStopPress, setLastStop] = useState(0);
    const [totalPerformedTime, setTotalPerformedTime] = useState(0);
    const [date, setDate] = useState("00:00:00");
    const [initialTime, setInitialTime] = useState(0);
    const [interval, setNewInt] = useState(0);
    const [deltaTime, setDelta] = useState(0);

    //below are the arrays containing the actualTimes and performed times
    const [actualTimeArr, setActualTime] = useState([]);
    const [performedTime, setPerformedTime] = useState([]);

    const [pause, setPause] = useState("pause");
    const [start, setTimerState] = useState(false);
    //process utilized for the time study from TimeSelect.js
    const location = useLocation();
    const  timer  = location.state.timer.process;
    const title = location.state.timer.title;

    const [step, setStep] = useState(0);
    const [showAlert, setAlert] = useState(false);

    const navigate = useNavigate();

    function startTimer(e) {
        //only setting total time on initial start press
        if (totalTime == 0) {
            setTotal(Date.now());
        }
        setLastStop(Date.now());
        const w = Date.now();
        setTimerState(true);
        setInitialTime(w); //this will start the timer. Check UseEffect() below
        document.getElementById("start").classList.toggle("invisible");
        document.getElementById("stop").classList.toggle("invisible");
    }
    //causing idle timer
    useEffect(()=> {
        if (start == true) {
            //this interval updates the timer every second.
            var i = setInterval(()=> {
                const currentTime = Date.now();
                const delta = currentTime  - initialTime;
                setDate(msToTime(delta));
                //delta is a variable for the seconds that have passed. 
                setDelta(delta);
            }, 1000);
            setNewInt(i)

        }

    },[initialTime]);

    function pauseTimer(e) {
        if (pause === "pause") {
            setNewInt(clearInterval(interval));
            setPause("unpause");

        } else if(pause === "unpause" && interval == undefined) {
            setPause("pause")
            setInitialTime(Date.now() - deltaTime);
        }
    }

    // useEffect(()=> {
    //     console.log(actualTimeArr);
    //     console.log(performedTime);

    // }, [actualTimeArr, performedTime])


    async function stopTimer(e) {
        setTimerState(false);
        setDate("00:00:00");
        //increases totalperformed time with the ellpased time recorded on the Timer
        setTotalPerformedTime(totalPerformedTime + deltaTime);
        //clears interval which progresses the timer (stops it)
        setNewInt(clearInterval(interval));
    
        //edits the visibility and state of the buttons
        setPause("pause");
        document.getElementById("stop").classList.toggle("invisible");
        document.getElementById("start").classList.toggle("invisible");

        //actuaTime is how long the user really spent on the step. 
        //This is the timer that is running in the background.
        const actualTime = Date.now() - lastStopPress;
            
        //if-block handles progession of steps. If on last step end the session.
        if (step < timer.length - 1) {
            setStep(step + 1);
            setActualTime([...actualTimeArr, actualTime]);
            setPerformedTime([...performedTime, deltaTime]);
        } else if (step == timer.length - 1) {
            setActualTime([...actualTimeArr, actualTime]);
            setPerformedTime([...performedTime, deltaTime]);
            setAlert(true);
            sendToBackend();
            setTimeout(() => {sendToDashboard()}, 2000)
            //create of function that sends alert and adds to backend
        } 

    }
    async function sendToBackend() {
            const totalActualTime = Date.now() - totalTime;
            await axios.post('/api/v1/timer/users', {title: title, actualTime: actualTimeArr, performedTime: performedTime, totalPerformedTime: totalPerformedTime, totalActualTime: totalActualTime, dateCompleted: new Date()}).then(res => {
        }).catch(err => console.log(err));

    }
    function sendToDashboard() {
        navigate("/dashboard")

    }
    function msToTime(duration) {
        const milliseconds = parseInt((duration % 1000) / 100);
        var seconds = Math.floor((duration / 1000) % 60);
        var minutes = Math.floor((duration / (1000 * 60)) % 60);
        var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds 
      }
     


    return (
        <div>
            <Navbar/>
            
            {showAlert? <Alert Title="Well Done" innerText="You have completed this time study! You will be redirected to home page. "/> : false }
        <div className="timer-body">
            <div className="container1">
                <h1>{timer[step].stepName}</h1>
            <div className = "timer-box">
                    <h1 id="timer">{`${date}` }</h1>   
                </div>  
                <div className="d-flex justify-content-center mb-2">
                    
                    <button id="start" onClick={startTimer}  className="btn btn-lg  btn-primary mx-1">start</button>
                    <button id="pause" onClick={pauseTimer} className="btn btn-lg btn-dark mx-1">{pause}</button>
                    <button id="stop" onClick={stopTimer} className="btn btn-lg btn-danger mx-1 invisible">stop</button>
                </div>
                
            </div>
           
        </div>
        </div>);

}


