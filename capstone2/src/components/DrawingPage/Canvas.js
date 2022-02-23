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
            //variables
        this.isPainting = false;
        this.prevPos = {x : 0,
        y : 0};
        this.pointsBetween = [];
    }


    // return the least four points that the user drew
    // for line smoothing
    // allows for bezier in future
    getHistory(lineHistory) {
        const lastFour = [];

        for (var i = 0; i < 4; i++) {
            lastFour.push(lineHistory.pop());
        }
        //console.log(lastFour);
        return lastFour;
    }

    buildLineData(start,between,end) {
        return {
            start: {...start},
            pointsBetween: [...between],
            end: {...end},
            lineWidth: this.props.lineWidth,
            strokeColor: this.props.strokeColor,
        }
    }

    buildPointsBetween(points) {
        this.pointsBetween.push(points);
        return this.pointsBetween;
    }

    onMouseDown({nativeEvent}) {
        //console.log("mouse down");
        //grab mouse x and y from native event
        const {offsetX:prevX, offsetY:prevY} = nativeEvent;
        this.isPainting = true;
        //chuck it into prevPos
        this.prevPos = {prevX, prevY};
    }

    onMouseUp({nativeEvent}) {
        //console.log("mouse up");
        if(this.isPainting) {
            //this is the current point, which is the end
            const {offsetX:prevX, offsetY:prevY} = nativeEvent;
            const currentEnd = {prevX, prevY};

            //grab previous position
            const currentStart = this.prevPos;

            //send everything to the line data builder
            const lineData = this.buildLineData(currentStart, this.pointsBetween, currentEnd);

            this.sendHistory(lineData);

            //reset
            this.isPainting = false;
            this.pointsBetween = [];
        }
    }

    onMouseMove({nativeEvent}) {
        if(this.isPainting) {            
            //console.log("mouse move within canvas")
            //grab x and y again
            const {offsetX:currX, offsetY:currY} = nativeEvent;
            
            //but these are the CURRENT x and y
            //and we want to make a line from the previous position to the current one
            const currPos = {currX, currY};
            const previousPos = this.prevPos;
            let tempData = {
                start: {...previousPos},
                end: {...currPos},
                strokeColor: this.props.strokeColor,
                lineWidth: this.props.lineWidth
            };
            console.log(tempData);
            
            this.paint(tempData);
            this.prevPos = tempData.end;

            this.buildPointsBetween(tempData);
            //console.log(this.pointsBetween);
            
        }
    }

    onMouseLeave() {
        //console.log("mouse left canvas");
        this.isPainting = false;
    }

    paint(lineData) {
        const {currX, currY} = lineData.end;
        const {currX:prevX, currY:prevY} = lineData.start;

        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.moveTo(prevX, prevY);
        this.ctx.lineCap = 'round';

        //paintsmooth with points between?
        //loop thru points as groups of 4 - start, cp1, cp2, end

        this.ctx.lineTo(currX,currY);
        this.ctx.lineCap = "round";

        this.ctx.strokeStyle = lineData.strokeColor;
        this.ctx.lineWidth = lineData.lineWidth;

        this.ctx.stroke();

        this.ctx.restore();
    }

    //paint a smooth line to reduce user jitter
    paintSmooth(lineData) {
        // this.ctx.beginPath();
        // this.ctx.moveTo(lineData[3].x, lineData[3].y); //the third most recent point
        // this.ctx.lineCap = 'round';
        // this.ctx.bezierCurveTo(lineData[2].x, lineData[2].y, lineData[1].x, lineData[1].y, lineData[0].x, lineData[0].y);
        // this.ctx.strokeStyle = this.props.strokeColor;
        // this.ctx.stroke();
        
        //this.prevPos = lineData[1].end;
    }

    componentDidMount() {
        //you can change these they were just kinda big on my monitor lmao
        this.canvas.width = 800;
        this.canvas.height = 500;
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
        console.log("undo last lineeeee");
        this.redrawAllFromData(this.props.lineHistory);
    }

    redrawAllFromData(lineData) {
        //clear the canvas and redraw it all lol
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        lineData.map(line => {
            line.pointsBetween.map(lineBetween => {
                this.paint(lineBetween);
            })
        })
    }

    render() {
        return(
            <div className="canvasComponent">
                <canvas 
                ref={(ref) => (this.canvas = ref)}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseLeave={this.onMouseLeave}
                onMouseUp={this.onMouseUp}
                ></canvas>
            </div>
        );
    }
}

export default Canvas;