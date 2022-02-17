function Button(props) {
    return(
        <button style={props.style} onClick={props.onClick}>{props.buttonText}</button>
    );
}

export default Button;