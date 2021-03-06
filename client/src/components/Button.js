import React from "react";

export default function Button(props) {
    return(
        <button className={props.className} onClick={props.onClick} style={props.style}>{props.buttonText}</button>
    );
}