import Button from './Button';
import React from 'react';
import 'animate.css';

function Popup(props) {
    const [isOpen, setIsOpen] = React.useState(true);

    const popupStyle = {
        border: '1px solid black',
        padding: '15px',
        left: '',
        top: '5px',
    }

    const toggleOpenClose = () => {setIsOpen(!isOpen)};

    //being evil and override the toggle >:) force open the popup
    const toggleOverride = () => {setIsOpen(true)};

    const setClass = () => isOpen ? 'open' : 'closed';
    const setExit = () => isOpen ? '' : 'animate__animated animate__zoomOut';

    return(
        <div className={`popupComponentWrapper ` + setClass() + " " + setExit()} style={popupStyle}>
            <div className="popupComponent">
                <Button styleBtn={"primary"} className="closeButton" buttonText="Close" onClick={toggleOpenClose}></Button> 

                <h2>{props.popupTitleText}</h2>
                <p>{props.popupText}</p>

                <Button className="button1" styleBtn={"secondary"} buttonText={props.button1Text} onClick={(e) => props.onButton1Click(e)}></Button>

                {props.button2Text && props.onClick2 &&
                    <Button className="button2" styleBtn={"tertiary"} buttonText={props.button2Text} onClick={props.onButton2Click}></Button>
                }
            </div>
        </div>
    );
}

export default Popup;