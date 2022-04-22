import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';
import DrawingPage from './DrawingPage';

class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        
        this.onMouseLeave = this.onMouseLeave.bind(this);
        
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);

        this.smooth = false;
        this.isPainting = false;
        this.isErasing = false;
        this.prevPos = {x : 0,
        y : 0};
        this.pointsBetween = [];

        //either drawing or erasing
        this.status = this.props.status;
    }

    // return the least four points that the user drew
    // for line smoothing
    // allows for bezier in future
    getHistory(lineHistory) {
        const lastFour = [];

        for (var i = 0; i < 4; i++) {
            lastFour.push(lineHistory.pop());
        }
        return lastFour;
    }

    buildLineData(start,between,end, status) {
        return {
            start: {...start},
            pointsBetween: [...between],
            end: {...end},
            lineWidth: this.props.lineWidth,
            strokeColor: this.props.strokeColor,
            //whether or not its draw or eraser
            status: status,
        }
    }

    completeLineDataMouse(nativeEvent) {
        //this is the current point, which is the end
        const {offsetX:prevX, offsetY:prevY} = nativeEvent;
        const currentEnd = {prevX, prevY};

        //grab previous position
        const currentStart = this.prevPos;

        //send everything to the line data builder
        const lineData = this.buildLineData(currentStart, this.pointsBetween, currentEnd, this.props.status);

        this.sendHistory(lineData);

        //reset
        this.isPainting = false;
        this.pointsBetween = [];
    }

    completeLineDataTouch(nativeEvent) {
        //this is the current point, which is the end
        const {offsetX:prevX, offsetY:prevY} = nativeEvent;
        const currentEnd = {prevX, prevY};

        //grab previous position
        const currentStart = this.prevPos;

        //send everything to the line data builder
        const lineData = this.buildLineData(currentStart, this.pointsBetween, currentEnd, this.props.status);

        this.sendHistory(lineData);

        //reset
        this.isPainting = false;
        this.pointsBetween = [];
    }

    buildPointsBetween(points) {
        this.pointsBetween.push(points);
        return this.pointsBetween;
    }

    onMouseDown({nativeEvent}) {
        //grab mouse x and y from native event
        const {offsetX:prevX, offsetY:prevY} = nativeEvent;
        this.isPainting = true;
        //chuck it into prevPos
        this.prevPos = {prevX, prevY};
    }

    onMouseUp({nativeEvent}) {
        if(this.isPainting) {
            this.completeLineDataMouse(nativeEvent);
        }
    }

    onTouchEnd({nativeEvent}) {
        if(this.isPainting) {
            this.completeLineDataTouch(nativeEvent);
        }
    }

    onTouchStart({nativeEvent})
    {
        const prevX = nativeEvent.touches[0].clientX;
        const prevY = nativeEvent.touches[0].clientY;

        this.isPainting = true;
        //chuck it into prevPos
        this.prevPos = {prevX, prevY};
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
                lineWidth: this.props.lineWidth,
                status: this.props.status,
            };
            
            this.paint(tempData);
            this.prevPos = tempData.end;

            this.buildPointsBetween(tempData);
        }
    }

    onTouchMove({nativeEvent}) {
        if(this.isPainting) {
            const bcr = nativeEvent.target.getBoundingClientRect();
            let currX = nativeEvent.targetTouches[0].clientX - bcr.x;
            let currY = nativeEvent.targetTouches[0].clientY - bcr.y;

            const currOffset = {currX, currY};

            let tempData = {
                //clone prevPos to start so our data is all nice n immutable:)
                start: {...this.prevPos},
                //clone curroffset to the end as the end point :)
                end: {...currOffset},
                strokeColor: this.props.strokeColor,
                lineWidth: this.props.lineWidth,
                status: this.props.status
            }
            this.paint(tempData);
            this.prevPos = tempData.end;

            this.buildPointsBetween(tempData);

        }
    }

    onMouseLeave({nativeEvent}) {
        if(this.isPainting) {
            this.completeLineDataMouse(nativeEvent);
        }
    }

    paint(lineData) {
        const {currX, currY} = lineData.end;
        const {currX:prevX, currY:prevY} = lineData.start;

        this.ctx.save();

        if(lineData.status === true) {
            //if true, paint normally
            this.ctx.globalCompositeOperation = 'source-over';
        } else {
            //else paint as the eraser
            this.ctx.globalCompositeOperation = 'destination-out';
        }
        
        this.ctx.beginPath();
        this.ctx.moveTo(prevX, prevY);
        this.ctx.lineCap = 'round';

        this.ctx.lineTo(currX,currY);
        this.ctx.lineCap = "round";

        this.ctx.strokeStyle = lineData.strokeColor;
        this.ctx.lineWidth = lineData.lineWidth;

        this.ctx.stroke();

        this.ctx.restore();

        this.drawGuideDots(this.props.bodyPart);
    }

    drawGuideDots(bodyPart) {
        //console.log(bodyPart)
        if (bodyPart === "Head") {
            //these might need to be adjusted
            this.ctx.strokeStyle = "black";
            this.ctx.beginPath();
            this.ctx.arc(300, 590, 9, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(700, 590, 9, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
        } 
        if (bodyPart === "Body") {
            //yea
            this.ctx.strokeStyle = "black";

            this.ctx.beginPath();
            this.ctx.arc(700, 20, 9, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(300, 20, 9, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(750, 690, 9, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(200, 690, 9, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
        }
        if (bodyPart === "Legs") {
            //draw dots
            this.ctx.strokeStyle = "black";
            this.ctx.beginPath();
            this.ctx.arc(690, 20, 9, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(200, 20, 9, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
        }
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
        this.canvas.width = 700;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext('2d');
    }

    componentDidUpdate(prevProps) {
        if(prevProps.undoTrigger !== this.props.undoTrigger) {
            this.undoLastLine();
        }

        if(prevProps.clear !== this.props.clear) {
            this.clearAll();
        }

        if(this.props.doneTrigger !== prevProps.doneTrigger)
        {
            this.saveCanvas();
        }

        //this.drawGuideDots(this.props.bodyPart);
    }

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGuideDots(this.props.bodyPart);
    }

    sendHistory(lineData) {
        this.props.historyCallback(lineData);
    }

    undoLastLine() {
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

        this.drawGuideDots(this.props.bodyPart);
    }

    saveCanvas() {
        //first we save the image as a base64 image
        //then were going to use sendCanvasData to send it back
        //to the main drawingpage
        let dataURL = this.canvas.toDataURL();
        this.props.doneCallback(dataURL);
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
                onTouchStart = {this.onTouchStart}
                onTouchMove = {this.onTouchMove}
                onTouchEnd = {this.onTouchEnd}
                ></canvas>
            </div>

        );
    }
}

export default Canvas;