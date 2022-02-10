import Button from './Button';
import React from 'react';

function Popup(props) {
    const [isOpen, setIsOpen] = React.useState(true);

    const popupStyle = {
        border: '1px solid black',
        padding: '15px',
        width: '50vw',
    }

    const toggleOpenClose = () => {setIsOpen(!isOpen)};

    //being evil and override the toggle >:) force open the popup
    const toggleOverride = () => {setIsOpen(true)};

    return(
        <div className="popupComponentWrapper">
        {isOpen &&
            <div className="popupComponent" style={popupStyle}>
                <Button styleBtn={"primary"} className="closeButton" buttonText="Close" onClick={toggleOpenClose}></Button>    
                {props.popupText}
                <Button className="button1" styleBtn={"secondary"} buttonText={props.button1Text} onClick={(e) => props.onButton1Click(e)}></Button>
                    {props.button2Text && props.onClick2 &&
                        <Button className="button2" styleBtn={"tertiary"} buttonText={props.button2Text} onClick={props.onButton2Click}></Button>
                    }
            </div>
        }
        </div>
    );
}

export default Popup;