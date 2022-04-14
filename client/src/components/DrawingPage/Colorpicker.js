import RadioButton from "../RadioButton";

function Colorpicker(props) {
    const buttonStyle = {
        backgroundColor: props.value,
        border: 'none',
        cursor: 'pointer',
        width: '45px',
        height: '45px'
    };

    return(
        <RadioButton className="colorOption" name="colorOption" onClick={props.onClick} style={buttonStyle}></RadioButton>
    );
}

export default Colorpicker;