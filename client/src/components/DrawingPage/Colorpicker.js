import Button from "../Button";

function Colorpicker(props) {
    const buttonStyle = {
        backgroundColor: props.value,
        border: 'none',
        cursor: 'pointer',
        width: '45px',
        height: '45px'
    };

    return(
        <Button className="colorOption" onClick={props.onClick} style={buttonStyle}></Button>
    );
}

export default Colorpicker;