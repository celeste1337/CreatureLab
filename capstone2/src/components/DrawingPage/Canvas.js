import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';

class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        //this.endPaintEvent = this.endPaintEvent.bind(this);
    }
    //variables
    isPainting = false;
    prevPos = {offsetX : 0,
         offsetY : 0};

   // mouse functions
    changeMousePosition = ({x,y}) => {
        //setMousePos(x, y);
    }

    onMouseDown({nativeEvent}) {
        console.log("mouse down");
        //grab mouse x and y from native event
        const {offsetX, offsetY} = nativeEvent;
        this.isPainting = true;
        //chuck it into prevPos
        this.prevPos = {offsetX, offsetY};
    }

    onMouseMove({nativeEvent}) {
        if(this.isPainting) {
            console.log("mouse move within canvas")
            //grab x and y again
            const {offsetX, offsetY} = nativeEvent;
            //but these are the CURRENT x and y
            //and we want to make a line from the previous position to the current one
            const currOffset = {offsetX, offsetY};

            //we kinda dont need this yet lol but eventually we add all the linedata to an array and send it off to the server :)
            // const lineData = {
            //     //clone prevPos to start so our data is all nice n immutable:)
            //     start: {...this.prevPos},
            //     //clone curroffset to the end as the end point :)
            //     end: {...currOffset},
            // }

            this.paint(this.prevPos, currOffset);
        }
    }

    onMouseLeave() {
        this.isPainting = false;
    }

    paint(prevPos, currPos) {
        const {offsetX, offsetY} = currPos;
        const {offsetX:x, offsetY:y} = prevPos;

        this.ctx.beginPath();
        this.ctx.moveTo(offsetX, offsetY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        this.prevPos = {offsetX, offsetY};
    }

    componentDidMount() {
        //you can change these they were just kinda big on my monitor lmao
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.ctx = this.canvas.getContext('2d');
    }

    render() {
        return(
            <canvas 
            ref={(ref) => (this.canvas = ref)}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
            style={{border: "1px solid black"}}></canvas>
        );
    }
}

export default Canvas;