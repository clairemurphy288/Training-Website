import {useState, useEffect} from 'react';
import React, {Component} from 'react';
import "./timer.css"
import Navbar from "../quiz/navbar/quiznavbar";
import {useLocation} from 'react-router-dom';
import axios from 'axios';
export default function Timer(props) { 
    //set date only on first start push/
    const [totalTime, setTotal] = useState(0);
    const [lastStopPress, setLastStop] = useState(0);
    const [totalPerformedTime, setTotalPerformedTime] = useState(0);
    const [date, setDate] = useState(new Date().toLocaleString());
    const [initialTime, setInitialTime] = useState(0);
    const [pause, setPause] = useState("pause")
    const [interval, setNewInt] = useState(0);
    const [deltaTime, setDelta] = useState(0);

    //process utilized for the time study from TimeSelect.js
    const location = useLocation();
    const  timer  = location.state.timer.process;

    const [step, setStep] = useState(0);

    function startTimer(e) {
        //only setting total time on initial start press
        if (totalTime == 0) {
            setTotal(Date.now());
        }
        const w = Date.now();
        setInitialTime(w);
        document.getElementById("start").classList.toggle("invisible");
        document.getElementById("stop").classList.toggle("invisible");
        console.log("timer started");
    }
    useEffect(()=> {
        if (initialTime !== 0) {
            var i = setInterval(()=> {
                const currentTime = Date.now();
                const delta = currentTime  - initialTime;
                // console.log(msToTime(delta));
                setDate(msToTime(delta));
    
            }, 1000);
            setNewInt(i)

        }

    },[initialTime]);



    function pauseTimer(e) {
        if (pause === "pause") {
            setNewInt(clearInterval(interval));
            console.log("pause timer");
            setPause("unpause");

        } else if(pause === "unpause") {
            setPause("pause")
        }
    }

    useEffect(()=> {
        if(pause === "unpause" && interval === undefined) {
            console.log(msToTime(deltaTime))
        } else if(pause === "pause" && interval === undefined) {
            console.log("the intial time: " + initialTime);
            console.log("the delta time: " + deltaTime);
            setInitialTime(Date.now() - deltaTime);

        }
    },[pause]);


    async function stopTimer(e) {
        console.log("stop timer");
        let performedTime;
        if (pause == "unpause") {
            const currentTime = Date.now();
            const delta = currentTime  - initialTime;
            performedTime = delta;
        } else {
            performedTime = deltaTime;
        
        }

        setTotalPerformedTime(totalPerformedTime + performedTime);
        setNewInt(clearInterval(interval));
        setStep(step + 1);
        document.getElementById("stop").classList.toggle("invisible");
        document.getElementById("start").classList.toggle("invisible");
        const actualTime = Date.now() - totalTime;

        console.log(msToTime(actualTime));
        console.log(msToTime(performedTime));

         await axios.post('/api/v1/timer/users', {actualTime: actualTime, performedTime: performedTime}).then(res => {
            console.log(res.data)
        }).catch(err => console.log(err));

    }
    function msToTime(duration) {
        setDelta(duration);
        // console.log(duration);
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
        <div className="timer-body">
            <div className="container1">
                <h1>{timer[step].stepName}</h1>
            <div className = "timer-box">
                    <h1 id="timer">{`${date}` }</h1>   
                </div>  
                <div className="d-flex justify-content-center mb-2">
                    {/* when the user hits start: remove start button */}
                    
                    <button id="start" onClick={startTimer}  className="btn btn-lg  btn-primary mx-1">start</button>
                    <button id="pause" onClick={pauseTimer} className="btn btn-lg btn-dark mx-1">{pause}</button>
                    <button id="stop" onClick={stopTimer} className="btn btn-lg btn-danger mx-1 invisible">stop</button>
                </div>
                
            </div>
           
        </div> </div>);

}


