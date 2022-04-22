import { ListCollectionsCursor } from 'mongodb';
import React, { useState } from 'react';
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
                            <div className='ruleOne'></div>
                            <Button className="nextButton" buttonText="Next" onClick={() => next(1)}></Button>
                        </div>
                    )}
                </Popup>,
            // elements:
            //         [lineWidthPicker, scribble]
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
                            <Button className="nextButton" buttonText="Next" onClick={() => next(2)}></Button>
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
                            <div className='ruleThree'></div>
                            <Button className="nextButton" buttonText="Next" onClick={() => next(3)}></Button>
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
                            <div className='ruleFour'></div>
                            <Button className="nextButton" buttonText="Next" onClick={() => next(4)}></Button>
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
                            <div className='ruleFive'></div>
                            <div className='closeButton' onClick={() => next(0)}>
                                <Button className="nextButton" buttonText="Close" onClick={close}></Button>
                            </div>
                        </div>
                    )}
                </Popup>
        },
    ];

    const [currentStep, setCurrent] = useState(0);

    // const lineWidthPicker = document.querySelector(".linewidthpickerWrapper");
    // const scribble = document.querySelector(".scribbleDiv");

    // const toolSwitch = document.querySelector(".sliderDiv");

    // // const dots

    // const ideas = document.querySelector(".ideasDiv");

    // const tools = [];

    // tools.push(lineWidthPicker, scribble, toolSwitch, ideas)

    const next = (i) => {
        //tools.foreach(tool => tool.style.zIndex = 10);

        setCurrent(i);
        //console.log(currentStep);

        
    }

    //console.log(currentStep);
    return (
        steps[currentStep].data
    );

}