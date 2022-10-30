import React from "react";
import { useState } from "react";

export default function TimerMenu(props) {
    const list = props.menuList.map((item,index)=> {
        if (index == 0) {
            return  <MenuItem class="table-secondary" stepName={item.stepName}/>
        } else {
            return  <MenuItem stepName={item.stepName}/>
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
        document.querySelector(".table-secondary").classList.remove("table-secondary");
        e.currentTarget.classList.toggle("table-secondary");
    }
    return <tr>
            <td onClick={onClick} className={props.class}>{props.stepName}</td>
        </tr>

}