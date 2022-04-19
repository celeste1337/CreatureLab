import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { ReactComponent as QuestionMark } from '../../data/assets/Question.svg';
import Button from '../Button';

function Instructions() {

    const next = () => {

    }

    return (
        <Popup
            className="testPopup"
            trigger={<Button className="rightButton" id="instructions" buttonText={<QuestionMark></QuestionMark>} />}
            closeOnDocumentClick
            modal
            position="top center"
        >
            {closeOne => (
                <div className='instructionsContainer'>
                    <div className='popupContent'>
                        <div className='orangeCreature'></div>
                        <div className="instPopupDiv">
                            <a className="close" onClick={closeOne}>X</a>
                            Use this to change your brush size
                        </div>
                    </div>
                    <Popup
                        trigger={<Button className="nextButton" buttonText="Next" onClick={closeOne()} />}
                        modal
                    >
                        {closeTwo => (
                            <div className='popupContent'>
                                <div className='orangeCreature'></div>
                                <div className="instPopupDiv">
                                    <a className="close" onClick={closeTwo}>X</a>
                                    Use this to change your dick size
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            )}
        </Popup>
    )

}

export default Instructions;