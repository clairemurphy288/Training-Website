import React from "react";
import { useState } from "react";

export default function TimerMenu(props) {
    const list = props.menuList.map((item,index)=> {
        if (index == 0) {
            return  <MenuItem class="table-secondary" setStep={props.setStep} index={index} stepName={item.stepName}/>
        } else {
            return  <MenuItem setStep={props.setStep} index={index} stepName={item.stepName}/>
        }
    })
    return(<div class="menu"><table class="table table-light table-hover table-borderless">
    <thead>
        <tr>
            <th>Steps</th>
        </tr>
    </thead>
    <tbody>
       {list}
    </tbody>
  </table>
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
    return <tr>
            <td onClick={onClick} className={props.class}>{props.stepName}</td>
        </tr>

}