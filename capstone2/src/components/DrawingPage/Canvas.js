import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';

class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        //this.endPaintEvent = this.endPaintEvent.bind(this);
    }
    //variables
    isPainting = false;


   // mouse functions
    changeMousePosition = ({x,y}) => {
        //setMousePos(x, y);
    }
    onMouseDown = () => {
        console.log("mouse down")
    }

    onMouseMove() {
        console.log("mouse move")
    }

    render() {
        return(
            <canvas 
            ref={(ref) => (this.canvas = ref)}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            style={{border: "1px solid black"}}></canvas>
        );
    }
}

export default Canvas;