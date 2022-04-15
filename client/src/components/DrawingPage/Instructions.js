import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { ReactComponent as QuestionMark } from '../../data/assets/Question.svg';
import Button from '../Button';

class Instructions extends React.Component {
    render() {
        return (
            <Popup
                className="testPopup"
                trigger={<Button className="rightButton" id="instructions" buttonText={<QuestionMark></QuestionMark>} />}
                closeOnDocumentClick
                modal
                position="top center"
            >
                {close => (
                    <div className='instructionsContainer'>
                        <div className='popupContent'>
                            <div className='orangeCreature'></div>
                            <div className="instPopupDiv">
                                <a className="close" onClick={close}>X</a>
                                Use this to change your brush size
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        )
    }
}

export default Instructions;