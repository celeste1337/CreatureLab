import React from "react";
import Button from "../Button";

function LineWidthPicker(props) {
    const buttonStyle = {

    }

    return(
        <Button id={props.id} className={props.className} onClick={props.onClick} style={buttonStyle} buttonText={props.buttonText}></Button>
    );
}

export default LineWidthPicker;