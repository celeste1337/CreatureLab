import React, {useState, useRef, useEffect} from 'react';
import { render } from 'react-dom';

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

        //this.endPaintEvent = this.endPaintEvent.bind(this);
    }
    //variables
    isPainting = false;
    isErasing = false;
    prevPos = {offsetX : 0,
        offsetY : 0};
    
    
   // mouse functions
    changeMousePosition = ({x,y}) => {
        //setMousePos(x, y);
    }

    onMouseDown({nativeEvent}) {
        //console.log("mouse down");
        //grab mouse x and y from native event
        const {offsetX, offsetY} = nativeEvent;
        if(this.isPainting = true)
        {
            
            this.isErasing = false;
        }else{
            this.isErasing = true;
        }
        //chuck it into prevPos
        this.prevPos = {offsetX, offsetY};
    }

    onMouseUp({nativeEvent}) {
        //console.log("mouse up");
            const {offsetX, offsetY} = nativeEvent;
            this.prevPos = {offsetX, offsetY};
            this.isPainting = false;
            this.isErasing = false;
                
    } 

    onTouchEnd({nativeEvent}) {
        //console.log("mouse up");
        this.isPainting = false;
        this.isErasing = false;
    }

    onTouchStart({nativeEvent})
    {
        const offsetX = nativeEvent.touches[0].clientX;
        const offsetY = nativeEvent.touches[0].clientY;

        if(this.isPainting = true)
        {
            this.isErasing = false;
        }else{
            this.isErasing = true;
        }
        //chuck it into prevPos
        this.prevPos = {offsetX, offsetY};
    }

    onMouseMove({nativeEvent}) {
        if(this.isPainting) {
            //console.log("mouse move within canvas")
            //grab x and y again
            const {offsetX, offsetY} = nativeEvent;
            //but these are the CURRENT x and y
            //and we want to make a line from the previous position to the current one
            const currOffset = {offsetX, offsetY};

            //we kinda dont need this yet lol but eventually we add all the linedata to an array and send it off to the server :)
            const lineData = {
                //clone prevPos to start so our data is all nice n immutable:)
                start: {...this.prevPos},
                //clone curroffset to the end as the end point :)
                end: {...currOffset},
                strokeColor: this.props.strokeColor,
                lineWidth: this.props.lineWidth,
                globalCompositeOperation: 'source-over',
            }
            this.sendHistory(lineData);
            
            this.paint(this.prevPos, currOffset, lineData.strokeColor, lineData.lineWidth, lineData.globalCompositeOperation);

        }if(this.isErasing)
        {
            const {offsetX, offsetY} = nativeEvent;
            
            const currOffset = {offsetX, offsetY};

            const lineData = {
                
                start: {...this.prevPos},
                
                end: {...currOffset},
                
                //strokeColor: this.props.strokeColor,

                globalCompositeOperation: 'destination-out',
            }

            this.sendHistory(lineData);
           
            this.erase(this.prevPos, currOffset, lineData.globalCompositeOperation);

        }
    }

    onTouchMove({nativeEvent}) {
        //console.log("touch moving");

        const offsetX = nativeEvent.touches[0].clientX;
        const offsetY = nativeEvent.touches[0].clientY;

        const currOffset = {offsetX, offsetY};

        
        if(this.isPainting) {
        
            //console.log("current offset " + currOffset.offsetX + "\n" + currOffset.offsetY)
            const lineData = {
                //clone prevPos to start so our data is all nice n immutable:)
                start: {...this.prevPos},
                //clone curroffset to the end as the end point :)
                end: {...currOffset},
                strokeColor: this.props.strokeColor,
                lineWidth: this.props.lineWidth,
                globalCompositeOperation: 'source-over',
            }
            this.sendHistory(lineData);
            this.paint(this.prevPos, currOffset, lineData.strokeColor, lineData.lineWidth, lineData.globalCompositeOperation);

        }

        if(this.isErasing)
        {
            const lineData = {
                
                start: {...this.prevPos},
                
                end: {...currOffset},
                
                //strokeColor: this.props.strokeColor,

                globalCompositeOperation: 'destination-out',
            }

            this.sendHistory(lineData);
            this.erase(this.prevPos, currOffset, lineData.globalCompositeOperation);
        }
    }

    onMouseLeave() {
        //console.log("mouse left canvas");
        this.isPainting = false;
        this.isErasing = false;
    }

    paint(prevPos, currPos, strokeColor, lineWidth, globalCompOp) {
        const {offsetX, offsetY} = currPos;
        const {offsetX:x, offsetY:y} = prevPos;

        this.ctx.save();

        this.ctx.globalCompositeOperation = globalCompOp;

        if(globalCompOp === 'source-over')
        {
            this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = strokeColor;
        }else{
            this.ctx.lineWidth = 20;
            this.ctx.strokeStyle = 'white';
        }
        
        
        this.ctx.beginPath();
        
        this.ctx.moveTo(offsetX, offsetY);
        this.ctx.lineTo(x, y);
        
        this.ctx.stroke();        

        this.ctx.restore();
        
        this.prevPos = {offsetX, offsetY};
    }

    erase(prevPos, currentPos, globalCompOp)
    {
        console.log("In erase");

        const {offsetX, offsetY} = currentPos;
        const {offsetX:x, offsetY:y} = prevPos;

        this.ctx.save();

        this.ctx.globalCompositeOperation = globalCompOp;

        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2 *Math.PI);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(offsetX, offsetY);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();        
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();


        this.ctx.restore();
        
        this.prevPos = {offsetX, offsetY};

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

        if(prevProps.eraseTrigger){//!== this.props.eraseTrigger){
            if(this.props.eraseTrigger)
            {
                //true so erase
                this.isPainting = false;
                this.isErasing = true;
                //this.erase(this.prevPos);   
            }else
            {
                this.isErasing = false;
                this.isPainting = true;
            }
            
        }

        if(prevProps.paintTrigger!== this.props.paintTrigger)
        {
            if(this.props.paintTrigger)
            {
                //true so erase
                this.isPainting = true;
                this.isErasing = false; 
                
            }else
            {
                this.isErasing = true;
                this.isPainting = false;
            }
        }

        if(prevProps.doneTriggered === true)
        {
            this.saveImg();
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
            this.paint(line.start, line.end, line.strokeColor, line.lineWidth, line.globalCompositeOperation)
        })
    }

    saveImg() {
        let canvas = document.querySelector('canvas');
        let link = document.createElement("a");
        link.download = "download.png";
        link.href = canvas.toDataURL();
        link.click();
    }

    render() {
        return(
            <canvas 
            ref={(ref) => (this.canvas = ref)}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
            onMouseUp={this.onMouseUp}
            onTouchStart = {this.onTouchStart}
            onTouchMove = {this.onTouchMove}
            onTouchEnd = {this.onTouchEnd}
            style={{border: "1px solid black"}}
            ></canvas>
        );
    }
}

export default Canvas;