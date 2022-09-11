import {useState, useEffect} from 'react';
import React, {Component} from 'react';
import "./timer.css"
import Navbar from "../quiz/navbar/quiznavbar";
export default function Timer(props) { 
    const [date, setDate] = useState(new Date().toLocaleString());
    const [initialTime, setInitialTime] = useState(0);
    const [pause, setPause] = useState("pause")
    const [interval, setNewInt] = useState(0);
    const [deltaTime, setDelta] = useState(0);
    const [placeholder, setPlaceholder] = useState(0);
    function startTimer(e) {
        const w = Date.now();
        setInitialTime(w);
        console.log("timer started");
    }
    useEffect(()=> {
        if(initialTime !== 0) {
            var i = setInterval(()=> {
                const currentTime = Date.now();
                const delta = currentTime  - initialTime;
                console.log(msToTime(delta));
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

    function stopTimer(e) {
        console.log("stop timer");
        setNewInt(clearInterval(interval));

    }
    function msToTime(duration) {
        setDelta(duration);
        console.log(duration);
        // const milliseconds = parseInt((duration % 1000) / 100);
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
            <div className = "timer-box">
                    <h1 id="timer">{`${date}` }</h1>   
                </div>  
                <div className="d-flex justify-content-center mb-2">
                    
                    <button onClick={startTimer}  className="btn btn-lg  btn-dark mx-1">start</button>
                    <button onClick={pauseTimer} className="btn btn-lg btn-dark mx-1">{pause}</button>
                    <button onClick={stopTimer} className="btn btn-lg btn-dark mx-1">stop</button>
                </div>
                
            </div>
           
        </div> </div>);

}


