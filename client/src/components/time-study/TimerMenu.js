import React from "react";
import { useState } from "react";

export default function TimerMenu(props) {

    const list = props.menuList.map((item,index)=> {
       return <tr>
            <td className="">{item.stepName}</td>
        </tr>
    })
    return(<div class="menu"><table class="table table-secondary table-hover table-borderless">
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