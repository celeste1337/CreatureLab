// this page stores refs to canvas history, and sets up all the components for the drawing page
//todo lol

import React from 'react';
import Canvas from './Canvas';
import Colorpicker from './Colorpicker';
import Button from '../Button';
import {erase} from './Canvas';

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
            },
            currentColor: "",
            lineHistory: [],
        }
        this.removeLastLine = this.removeLastLine.bind(this);
        
    }

    undoTriggered = false;
    eraseTriggered = false;

    handleHistoryCallback = (childData) => {
        this.setState({
            lineHistory: [...this.state.lineHistory, childData]
        });
        //this is the history of line movement
        //all the moves theyve made!
        //will be useful for playback probably hopefully lol
        //console.log(this.state.lineHistory);

    }

    handleEraserCallback = (childData) => {
        this.setState({
            lineHistory: [...this.state.lineHistory, childData]
        });

    }

    handleEraser()
    {
        this.eraseTriggered = !this.eraseTriggered;
        
        console.log(this.eraseTriggered);
    }
    


    changeColor(i) {
        this.setState({
            currentColor: i
        });
    }

    renderColorPicker(i) {
        return (
            <Colorpicker value={this.state.colors[i]} onClick={() => this.changeColor(this.state.colors[i])} />
        )
    }

    renderUndoButton() {
        return (
            <Button onClick={() => this.removeLastLine()} buttonText={"Undo"} />
        )
    }

    renderEraseButton() {
        return (
            <Button onClick={() => this.handleEraser()} buttonText={"Erase"} />
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
                <Canvas 
                    strokeColor={this.state.currentColor} 
                    eraseTrigger = {this.eraseTriggered} 
                    historyCallback={this.handleHistoryCallback} 
                    undoTrigger={this.undoTriggered} 
                    lineHistory={this.state.lineHistory}>

                </Canvas>
                {this.renderUndoButton()}
                {this.renderEraseButton()}
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