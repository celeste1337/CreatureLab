import Button from "../Button";

function Colorpicker(props) {
    const buttonStyle = {
        backgroundColor: props.value,
        border: '1px solid darkgrey',
        cursor: 'pointer',
    };

    return(
        <Button className="colorOption" onClick={props.onClick} style={buttonStyle}></Button>
    );
}

export default Colorpicker;