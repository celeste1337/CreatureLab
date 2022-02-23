// this page stores refs to canvas history, and sets up all the components for the drawing page
//todo lol

import React from 'react';
import Canvas from './Canvas';
import Colorpicker from './Colorpicker';
import Button from '../Button';
import LineWidthPicker from './LineWidthPicker';

import { ReactComponent as CurrentColorIndicator } from '../../data/assets/currentColorScribble.svg';

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
            lineWidths: [
                {
                    size: 'Small',
                    width: '3'
                },
                {
                    size: 'Medium',
                    width: '7'
                },
                { size: 'Large',
                width: '12'}
            ],
            currentColor: "#333333",
            currentWidth: "7",
            lineHistory: [],
        }
        this.removeLastLine = this.removeLastLine.bind(this);

        this.indicatorStyle = {
            backgroundColor: this.state.currentColor,
        }
    }

    undoTriggered = false;

    handleHistoryCallback = (childData) => {
        this.setState({
            lineHistory: [...this.state.lineHistory, childData]
        });
        //this is the history of line movement
        //all the moves theyve made!
        //will be useful for playback probably hopefully lol
    }

    changeColor(i) {
        this.setState({
            currentColor: i
        });
    }

    changeWidth(i) {
        this.setState({
            currentWidth: i
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

    renderSmoothButton() {
        return (
            <Button onClick={() => this.toggleSmooth()} buttonText={"Smooth"} />
        )
    }
    renderLineWidthPicker() {
        //loop thru object
        let widths = [];
        this.state.lineWidths.map((i) => {
            widths.push(
                <LineWidthPicker key={i.width.toString()} value={i.width} onClick={() => this.changeWidth(i.width)} buttonText={i.size}/>
            )
        });
        return widths;
    }

    removeLastLine() {
        this.undoTriggered = !this.undoTriggered;

        let tempArr = this.state.lineHistory;

        tempArr.pop();

        this.setState({
            lineHistory: tempArr,
        })
    }

    toggleSmooth() {
        this.props.smooth = !this.props.smooth;
        console.log(this.props.smooth);
    }


    render() {
        return(
            <div className="drawingPage">
                <div className="linewidthpickerWrapper">
                    <h2>Brush Stroke</h2>
                    {this.renderLineWidthPicker()}
                </div>

                <div className="colorpickerWrapper">
                    <CurrentColorIndicator fill={this.state.currentColor}/>
                    {this.renderColorPicker()}
                </div>

                <Canvas strokeColor={this.state.currentColor} historyCallback={this.handleHistoryCallback} undoTrigger={this.undoTriggered} lineHistory={this.state.lineHistory} lineWidth={this.state.currentWidth} ></Canvas>

                {this.renderUndoButton()}
                
                
                


            </div>
        );
    }

}

export default DrawingPage;