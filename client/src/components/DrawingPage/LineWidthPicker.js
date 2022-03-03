import Button from "../Button";

function LineWidthPicker(props) {
    const buttonStyle = {

    }

    return(
        <Button className="lineWidthOption" onClick={props.onClick} style={buttonStyle} buttonText={props.buttonText}></Button>
    );
}

export default LineWidthPicker;