import React from "react";

//add color option

export default function Alert(props) {
    const color = "alert-" + props.color;
    const classNames = "alert alert-dismissible fade show fade-in-image " + color;
    return(<div class={classNames} role="alert">
        
        <h4 class="alert-heading">{props.Title}</h4>
            <p>{props.innerText}</p>
    <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
</div>)
}