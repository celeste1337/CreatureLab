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
            colors: [
                {color: "#eb2727"}, //red
                {color: "#333333"}, //black
                {color: "#ffffff"}, //white
                {color: "#f89c14"}, //orange
                {color: "#f1de2d"}, //yellow
                {color: "#82de57"}, //lightgreen
                {color: "#51ad42"}, //darkgreen
                {color: "#84b5fe"}, //lightblue
                {color: "#1f32de"}, //darkblue
                {color: "#bb4bf0"}, //purple
            ],
            currentColor: "",
            lineHistory: [],
        }
        this.removeLastLine = this.removeLastLine.bind(this);
    }

    undoTriggered = false;

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
        this.setState({
            currentColor: i
        });
    }

    renderColorPicker() {
        //loop thru object
        let pickers = [];
        this.state.colors.map((i) => {
            pickers.push(
                <Colorpicker key={i.color.toString()} value={i.color} onClick={() => this.changeColor(i.color)} />
            )
        });
           
        return pickers;
    }

    renderUndoButton() {
        return (
            <Button onClick={() => this.removeLastLine()} buttonText={"Undo"} />
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
                <Canvas strokeColor={this.state.currentColor} historyCallback={this.handleHistoryCallback} undoTrigger={this.undoTriggered} lineHistory={this.state.lineHistory}></Canvas>

                {this.renderUndoButton()}
                
                <div className="colorpickerWrapper">
                    {this.renderColorPicker()}
                </div>
                


            </div>
        );
    }

}

export default DrawingPage;