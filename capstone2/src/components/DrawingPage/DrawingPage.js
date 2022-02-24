// this page stores refs to canvas history, and sets up all the components for the drawing page
//todo lol

import React from 'react';
import Canvas from './Canvas';
import Colorpicker from './Colorpicker';
import Button from '../Button';

class DrawingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: {
                red: "#eb2727",
                black: "#333333",
                white: "#ffffff",
                orange: "#f89c14",
                yellow: "#f1de2d",
                lightgreen: "#82de57",
                darkgreen: "#51ad42",
                lightblue: "#84b5fe",
                darkblue: "#1f32de",
                purple: "#bb4bf0",
                erase: 'white',
            },
            currentColor: "",
            lineHistory: [],
        }
        this.removeLastLine = this.removeLastLine.bind(this);
    }

    undoTriggered = false;
    eraseTriggered = false;
    paintTriggered = false;
    doneTriggered = false;
    
    

    handleHistoryCallback = (childData) => {
        this.setState({
            lineHistory: [...this.state.lineHistory, childData]
        });
        //this is the history of line movement
        //all the moves theyve made!
        //will be useful for playback probably hopefully lol
        //console.log(this.state.lineHistory);
    }

    changeColor(i) {
        this.paintTriggered = true;
        this.eraseTriggered = false; 

        this.setState({
            currentColor: i
        });
        
        
    }

    handleEraser()
    {
        this.eraseTriggered = true;
        
        //console.log(this.eraseTriggered);

        //if(this.bColor === 'red'? this.bColor ='white' : this.bColor = 'red');
        
    }//handle eraser

    handleDone()
    {
        //Done btn was triggered.
        //save the image 
        //console.log('handle done');
        this.doneTriggered = !this.doneTriggered;
        
    }

    renderColorPicker(i) {
        return (
            <Colorpicker value={this.state.colors[i]} onClick={(e) => this.changeColor(this.state.colors[i])} />
        )
    }

    renderUndoButton() {
        return (
            <Button onClick={(e) => this.removeLastLine()} buttonText={"Undo"} />
        )
    }
    renderEraseButton() {
        return (
            <Button value = {this.eraseTriggered} onClick={(e) => this.handleEraser()} style={{background: this.bColor,color: this.textColor}}buttonText={"Erase"} />
        )
    }

    renderDoneButton(){
        return(
            <Button onClick={() => this.handleDone()} buttonText={"Done"} />
        )
    }


    removeLastLine() {
        this.undoTriggered = !this.undoTriggered;

        let tempArr = this.state.lineHistory;
        //make it look like its actually doing stuff lmfaooooo
        for(let i = 0; i < 5; i++) {
            tempArr.pop();
        }
        this.setState({
            lineHistory: tempArr,
        })
    }


    render() {
        return(
            <div className="drawingPage">
                <Canvas strokeColor={this.state.currentColor} 
                historyCallback={this.handleHistoryCallback} 
                undoTrigger={this.undoTriggered} 
                lineHistory={this.state.lineHistory}
                eraseTrigger = {this.eraseTriggered} 
                paintTriggered = {this.paintTriggered}
                doneTriggered = {this.doneTriggered}
                >
                </Canvas>

                {this.renderUndoButton()}
                {this.renderEraseButton()}
                {this.renderDoneButton()}
                {this.renderColorPicker('red')}
                {this.renderColorPicker('white')}
                {this.renderColorPicker('black')}
                {this.renderColorPicker('orange')}
                {this.renderColorPicker('yellow')}
                {this.renderColorPicker('lightgreen')}
                {this.renderColorPicker('darkgreen')}
                {this.renderColorPicker('lightblue')}
                {this.renderColorPicker('darkblue')}
                {this.renderColorPicker('purple')}
            </div>
        );
    }

}

export default DrawingPage;