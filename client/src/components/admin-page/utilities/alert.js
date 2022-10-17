import React from "react";

//add color option

export default function Alert(props) {
    return(<div class="alert alert-success alert-dismissible fade show fade-in-image" role="alert">
        
        <h4 class="alert-heading">{props.Title}</h4>
            <p>{props.innerText}</p>
    <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
</div>)
}