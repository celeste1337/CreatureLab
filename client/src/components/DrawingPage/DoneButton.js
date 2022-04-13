import React from 'react';
import { Navigate } from "react-router-dom";
import Button from '../Button';

const DoneButton = (props) => {
    
    const handleClick = () => {
        props.onClick();
    };

    return (
        <Button className="doneButton" onClick={handleClick} buttonText="I'm Finished!"></Button>
    );
};

export default DoneButton;