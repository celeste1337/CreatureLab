function Colorpicker(props) {
    const buttonStyle = {
        backgroundColor: props.value,
        padding: '0px',
        width: '20px',
        height: '20px',
        borderRadius: '3px',
        border: '1px solid darkgrey',
        cursor: 'pointer',
    };

    return(
        <button className="colorOption" onClick={props.onClick} style={buttonStyle}></button>
    );
}

export default Colorpicker;