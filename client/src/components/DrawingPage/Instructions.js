import React, { Component, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { ReactComponent as QuestionMark } from '../../data/assets/Question.svg';
import Button from '../Button';

export default function Instructions() {

    const steps = [
        {
            id: 0,
            data:
                <Popup
                    trigger={<Button className="rightButton" buttonText={<QuestionMark></QuestionMark>} />}
                    modal
                >
                    {close => (
                        <div className='popupContent'>
                            <div className='orangeCreature'></div>
                            <div className="instPopupDiv">
                                <a className="close" onClick={close}>X</a>
                                Use this to change your brush size
                            </div>
                            <Button className="nextButton" buttonText="Next" onClick={() => next()}></Button>
                        </div>
                    )}
                </Popup>
        },

        {
            id: 1,
            data:
                <Popup
                    trigger={<Button className="rightButton" buttonText={<QuestionMark></QuestionMark>} />}
                    modal
                >
                    {close => (
                        <div className='popupContent'>
                            <div className='orangeCreature'></div>
                            <div className="instPopupDiv">
                                <a className="close" onClick={close}>X</a>
                                Use this to switch between eraser and brush tools
                            </div>
                            <Button className="nextButton" buttonText="Next" onClick={() => next()}></Button>
                        </div>
                    )}
                </Popup>
        },

        {
            id: 2,
            data:
                <Popup
                    trigger={<Button className="rightButton" buttonText={<QuestionMark></QuestionMark>} />}
                    modal
                >
                    {close => (
                        <div className='popupContent'>
                            <div className='orangeCreature'></div>
                            <div className="instPopupDiv">
                                <a className="close" onClick={close}>X</a>
                                Make sure your drawing connects to the dots
                            </div>
                            <Button className="nextButton" buttonText="Next" onClick={() => next()}></Button>
                        </div>
                    )}
                </Popup>
        },

        {
            id: 3,
            data:
                <Popup
                    trigger={<Button className="rightButton" buttonText={<QuestionMark></QuestionMark>} />}
                    modal
                >
                    {close => (
                        <div className='popupContent'>
                            <div className='orangeCreature'></div>
                            <div className="instPopupDiv">
                                <a className="close" onClick={close}>X</a>
                                Tap here if you need help deciding what to draw
                            </div>
                            <Button className="nextButton" buttonText="Next" onClick={() => next()}></Button>
                        </div>
                    )}
                </Popup>
        },

        {
            id: 4,
            data:
                <Popup
                    trigger={<Button className="rightButton" buttonText={<QuestionMark></QuestionMark>} />}
                    modal
                >
                    {close => (
                        <div className='popupContent'>
                            <div className='orangeCreature'></div>
                            <div className="instPopupDiv">
                                <a className="close" onClick={close}>X</a>
                                Tap here when you're all done drawing
                            </div>
                            <Button className="nextButton" buttonText="Next" onClick={close}></Button>
                        </div>
                    )}
                </Popup>
        },
    ];

    const [currentStep, setCurrent] = useState(0);

    const next = () => {
        if (currentStep < 4) setCurrent(currentStep + 1);
    }

    return (
        steps[currentStep].data
    );

}