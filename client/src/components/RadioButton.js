import React from "react";

function RadioButton(props) {
    return (
            <input type="radio" name={props.name} className={props.className} onClick={props.onClick} style={props.style} defaultChecked={props.checked}>
                {props.buttonText}
            </input>
            
    );
}

export default RadioButton;