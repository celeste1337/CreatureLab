import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { ReactComponent as QuestionMark } from '../../data/assets/Question.svg';
import Button from '../Button';

export default function Instructions() {

    const lineWidthPicker = document.querySelector(".linewidthpickerWrapper");
    const scribble = document.querySelector(".scribbleDiv");

    const slider = document.querySelector(".sliderBack");

    const topDots = document.querySelector(".topDotDiv");
    const bottomDots = document.querySelector(".bottomDotDiv");

    const ideas = document.querySelector(".ideasDiv");

    const confirm = document.querySelector(".doneButton");

    const steps = [
        {
            id: 0,
            data:
                <Popup
                    trigger={<Button className="rightButton" buttonText={<QuestionMark></QuestionMark>} onClick={() => console.log('clicked')} />}
                    modal
                >
                    {close => (
                        <div className='popupContent'>
                            <div className='ruleOne'></div>
                            <Button className="nextButton" buttonText="Tap to Continue" onClick={() => next(1)}></Button>
                        </div>
                    )}
                </Popup>,
            elements:
                    [scribble, lineWidthPicker]
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
                            <div className='ruleTwo'></div>
                            <Button className="nextButton" buttonText="Continue" onClick={() => next(2)}></Button>
                        </div>
                    )}
                </Popup>,
            elements:
                [slider]
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
                            <div className='ruleThree'></div>
                            <Button className="nextButton" buttonText="Continue" onClick={() => next(3)}></Button>
                        </div>
                    )}
                </Popup>,
            elements:
                    [topDots, bottomDots],
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
                            <div className='ruleFour'></div>
                            <Button className="nextButton" buttonText="Continue" onClick={() => next(4)}></Button>
                        </div>
                    )}
                </Popup>,
            elements:
                    [ideas],
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
                            <div className='ruleFive'></div>
                            <div className='closeButton' onClick={() => next(0)}>
                                <Button className="nextButton" buttonText="Close" onClick={close}></Button>
                            </div>
                        </div>
                    )}
                </Popup>,
                elements:
                    [confirm],
        },
    ];

    const [currentStep, setCurrent] = useState(0);

    

    const tools = [];

    tools.push(scribble, lineWidthPicker, slider, ideas, confirm, topDots, bottomDots);

    const instructionsStarted = () => {
        console.log('inst clicked');
        steps[0].elements.forEach(element => element.style.zIndex = 1000);
    }

    const next = (i) => {
        tools.forEach(tool => tool.style.zIndex = 10);

        setCurrent(i);
        //console.log(currentStep);

        steps[i].elements.forEach(element => element.style.zIndex = 1000);
        console.log(steps[i].elements);
    }

    //console.log(currentStep);
    return (
        steps[currentStep].data
    );

}