function RadioButton(props) {
    return(
        <input type="radio" name={props.name} className={props.className} onClick={props.onClick} style={props.style}>{props.buttonText}</input>
    );
}

export default RadioButton;