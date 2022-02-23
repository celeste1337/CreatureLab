import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';
import DrawingPage from './DrawingPage';

class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.smooth = false;
        //this.endPaintEvent = this.endPaintEvent.bind(this);
    }
    //variables
    isPainting = false;
    prevPos = {offsetX : 0,
         offsetY : 0};

    // return the least four points that the user drew
    // for line smoothing
    // allows for bezier in future
    getHistory(lineHistory) {
        const lastFour = [];
        //console.log(lineHistory);

        for (var i = 0; i < 4; i++) {
            lastFour.push(lineHistory.pop().end);
        }

        return lastFour;
    }

   // mouse functions
    changeMousePosition = ({x,y}) => {
        //setMousePos(x, y);
    }

    onMouseDown({nativeEvent}) {
        //console.log("mouse down");
        //grab mouse x and y from native event
        const {offsetX, offsetY} = nativeEvent;
        this.isPainting = true;
        //chuck it into prevPos
        this.prevPos = {offsetX, offsetY};
    }

    onMouseUp({nativeEvent}) {
        //console.log("mouse up");
        if(this.isPainting) {
            const {offsetX, offsetY} = nativeEvent;
            this.prevPos = {offsetX, offsetY};
            this.isPainting = false;
        }
    }

    onMouseMove({nativeEvent}) {
        if(this.isPainting) {
            //console.log("mouse move within canvas")
            //grab x and y again
            const {x, y} = nativeEvent;
            //but these are the CURRENT x and y
            //and we want to make a line from the previous position to the current one
            const currOffset = {x, y};

            //we kinda dont need this yet lol but eventually we add all the linedata to an array and send it off to the server :)
            const lineData = {
                //clone prevPos to start so our data is all nice n immutable:)
                start: {...this.prevPos},
                //clone curroffset to the end as the end point :)
                end: {...currOffset},
                strokeColor: this.props.strokeColor,
            }
            this.sendHistory(lineData);

            const lastFourPoints = this.getHistory(this.props.lineHistory);
            console.log(lastFourPoints);

            //if (this.smooth) {
            //    this.paint(this.prevPos, currOffset);
            //} else {
            if (this.props.lineHistory.length % 3 == 0) this.paintSmooth(lastFourPoints);
            //}
        }
    }

    onMouseLeave() {
        //console.log("mouse left canvas");
        this.isPainting = false;
    }

    paint(prevPos, currPos, strokeColor) {
        const {offsetX, offsetY} = currPos;
        const {offsetX:x, offsetY:y} = prevPos;
        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.moveTo(offsetX, offsetY);
        this.ctx.lineCap = 'round';
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = strokeColor;
        this.ctx.stroke();

        this.ctx.restore();
        
        this.prevPos = {offsetX, offsetY};
    }

    //paint a smooth line to reduce user jitter
    paintSmooth(lineData) {
        this.ctx.beginPath();
        this.ctx.moveTo(lineData[3].x, lineData[3].y); //the third most recent point
        this.ctx.lineCap = 'round';
        this.ctx.bezierCurveTo(lineData[2].x, lineData[2].y, lineData[1].x, lineData[1].y, lineData[0].x, lineData[0].y);
        this.ctx.strokeStyle = this.props.strokeColor;
        this.ctx.stroke();
        
        //this.prevPos = lineData[1].end;
    }

    componentDidMount() {
        //you can change these they were just kinda big on my monitor lmao
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.ctx = this.canvas.getContext('2d');
    }

    componentDidUpdate(prevProps) {
        if(prevProps.undoTrigger !== this.props.undoTrigger) {
            this.undoLastLine();
        }
    }

    sendHistory(lineData) {
        this.props.historyCallback(lineData);
    }

    undoLastLine() {
        console.log("undo last lineeeee")
        this.redrawAllFromData(this.props.lineHistory);
    }

    redrawAllFromData(lineData) {
        //clear the canvas and redraw it all lol
        console.log(lineData);
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        lineData.map(line => {
            this.paint(line.start, line.end, line.strokeColor)
        })
    }

    render() {
        return(
            <canvas 
            ref={(ref) => (this.canvas = ref)}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
            onMouseUp={this.onMouseUp}
            style={{border: "1px solid black"}}
            ></canvas>
        );
    }
}

export default Canvas;