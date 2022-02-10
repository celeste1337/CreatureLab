// this page stores refs to canvas history, and sets up all the components for the drawing page
//todo lol

import React from 'react';
import Canvas from './Canvas';
import Colorpicker from './Colorpicker';
import Button from '../Button';
import Popup from '../Popup';

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
            prompt: {
                promptList: ["Draw a creature that lives underwater.", "Draw a creature that lives in the forest.","Draw a little guyyyy","Draw something that likes fishing"],
                curPrompt: "",
            },
        }
        this.removeLastLine = this.removeLastLine.bind(this);
    }

    undoTriggered = false;

    componentDidMount() {
        //on initial mount
        this.setPrompt();
    }

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

    //
    // PROMPT STUFF & HOW TO USE POPUP COMPONENT
    //

    setPrompt = (e) => {
        this.setState({
            curPrompt: this.state.prompt.promptList[Math.floor(Math.random()*this.state.prompt.promptList.length)]
        });
    };

    renderPromptPopup(e) {
        return (
            //we pass in this.setPrompt ^^^^^ as the onclick but do NOT PASS IN WITH PARENTHESES
            
            <Popup popupText={this.state.curPrompt} button1Text={"Get a new prompt."} onButton1Click={this.setPrompt}></Popup>
        )
    }

    //
    // RENDER
    //

    render() {
        return(
            <div className="drawingPage">
                <Canvas strokeColor={this.state.currentColor} historyCallback={this.handleHistoryCallback} undoTrigger={this.undoTriggered} lineHistory={this.state.lineHistory}></Canvas>
                {this.renderUndoButton()}
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
                {this.renderPromptPopup()}
            </div>
        );
    }

}

export default DrawingPage;