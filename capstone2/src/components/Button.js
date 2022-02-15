function Button(props) {
    const buttonStylePushable = {
        display: 'inline-block',
        cursor: 'pointer',
        outlineOffset: '4px'
    }
    const buttonStyleFront = {
        cursor: 'pointer',
        display: 'block',
        padding: '5px 10px',
        borderRadius: '5px'
    }
    const buttonStylePrimary = {
        border: '1px solid red',
    }
    const buttonStyleSecondary = {
        border: '1px solid blue'
    }
    const buttonStyleTertiary = {
        border: '1px solid black'
    }
    //onclick
    const buttonStyleActive = {

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
        <div style={buttonStylePushable}>
            <button style={Object.assign({}, stylePicker(props.styleBtn), buttonStyleFront)} onClick={(e) => props.onClick(e)}>{props.buttonText}</button>
        </div>
    );
}

export default Button;