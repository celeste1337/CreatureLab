import React from "react";
import RadioButton from "../RadioButton";

function Colorpicker(props) {
    let checked = (props.value == '#333333' ? true : false)

    const buttonStyle = {
        backgroundColor: props.value,
        border: '4px solid ' + props.value,
        cursor: 'pointer',
        width: '45px',
        height: '45px'
    };

    return(
        <RadioButton className="colorOption" name="colorOption" onClick={props.onClick} style={buttonStyle} checked={checked}></RadioButton>
    );
}

export default Colorpicker;