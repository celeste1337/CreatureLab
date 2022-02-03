import Button from './Button';

function Popup(props) {
    return(
        <div className="popupComponent">
            {props.popupText}
            <Button className="button1" buttonText={props.buttonText} onClick={props.onClick}></Button>
            {props.button2Text && props.onClick2 &&
                <Button className="button2" buttonText={props.button2Text} onClick={props.onClick2}></Button>
            }
        </div>
    );
}

export default Popup;