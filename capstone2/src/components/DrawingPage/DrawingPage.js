// this page stores refs to canvas history, and sets up all the components for the drawing page
//todo lol

import React from 'react';
import { render } from 'react-dom';
import Canvas from './Canvas';

function DrawingPage(props) {

    return(
        <div className="drawingPage">
            <Canvas></Canvas>
        </div>
    );
}

export default DrawingPage;