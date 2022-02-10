function Button(props) {
    const buttonStylePrimary = {
        border: '1px solid red',
    }
    const buttonStyleSecondary = {
        border: '1px solid blue'
    }
    const buttonStyleTertiary = {
        border: '1px solid black'
    }

    const stylePicker = (styleName) => {
        let style;
        if(styleName==="primary") {
            style = buttonStylePrimary;
        } else if (styleName==="secondary") {
            style = buttonStyleSecondary;
        } else if (styleName==="tertiary") {
            style = buttonStyleSecondary;
        } else {
            //default primary cuz why not
            style = buttonStylePrimary;
        }

        return style;
    };

    return(
        <button style={stylePicker(props.styleBtn)} onClick={(e) => props.onClick(e)}>{props.buttonText}</button>
    );
}

export default Button;