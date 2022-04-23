import React from "react";

function Switch(props) {
    const switchStyle = {

    }
    return(
        <input style={switchStyle} onChange={props.onChange} checked={props.checked} type="checkbox"></input>
    );
}

export default Switch;