import React from "react";
import { useState } from "react";

export default function TimerMenu(props) {
    //bar that increments as you go 
    const list = props.menuList.map((item,index)=> {
        if (index == 0) {
            return  <MenuItem class="table-secondary" setStep={props.setStep} index={index} stepName={item.stepName}/>
        } else {
            return  <MenuItem setStep={props.setStep} index={index} stepName={item.stepName}/>
        }
    })
    return(<div class="menu d-flex">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-left caret-left" viewBox="0 0 16 16">
  <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
</svg>
        <table class="table table-light table-hover table-borderless">
    <thead>
        <tr>
            {list}
        </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-right caret-right" viewBox="0 0 16 16">
  <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
</svg>
  </div>);
}

function MenuItem(props) {
    function onClick(e) {
        if (e.currentTarget.classList.contains("table-success")) {
            document.getElementById("start").disabled = true;
            document.getElementById("pause").disabled = true;
        } else {
            document.getElementById("start").disabled = false;
            document.getElementById("pause").disabled = false;

        }
    
        //might have to create a counter for step progress
        props.setStep(props.index);
        document.querySelector(".table-secondary").classList.toggle("table-secondary");
        e.currentTarget.classList.toggle("table-secondary");
    }
    return <td onClick={onClick} className={props.class}>{props.stepName}</td>
        

}