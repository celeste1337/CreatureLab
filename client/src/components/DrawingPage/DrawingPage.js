// this page stores refs to canvas history, and sets up all the components for the drawing page
//todo lol

import React from 'react';
import Canvas from './Canvas';
import Colorpicker from './Colorpicker';
import Button from '../Button';
import LineWidthPicker from './LineWidthPicker';

import { ReactComponent as CurrentColorIndicator } from '../../data/assets/currentColorScribble.svg';
import Switch from '../Switch';
import { randomNumber } from '../../utilities/util';
import { nanoid } from 'nanoid';
import { config } from '../../utilities/constants';
//import "@lottiefiles/lottie-player";
import logo from '../../data/assets/Logo.png';

class DrawingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creatureId: '',
            colors: [
                { color: "#eb2727" }, //red
                { color: "#333333" }, //black
                { color: "#f89c14" }, //orange
                { color: "#f1de2d" }, //yellow
                { color: "#82de57" }, //lightgreen
                { color: "#51ad42" }, //darkgreen
                { color: "#84b5fe" }, //lightblue
                { color: "#1f32de" }, //darkblue
                { color: "#bb4bf0" }, //purple
                { color: "#FC84CC" } //pink
            ],
            lineWidths: [
                {
                    size: 'S',
                    width: '3',
                    selected: false
                },
                {
                    size: 'M',
                    width: '7',
                    selected: true
                },
                {
                    size: 'L',
                    width: '12',
                    selected: false
                }
            ],
            currentColor: "#333333",
            currentWidth: "7",
            lineHistory: [],
            //true means we are drawing
            status: true,
            finished: false,
        }
        this.removeLastLine = this.removeLastLine.bind(this);
        this.handleToolChange = this.handleToolChange.bind(this);

        this.indicatorStyle = {
            backgroundColor: this.state.currentColor,
        }

        this.undoTriggered = false;
        this.doneTriggered = false;
        this.dataURL = '';
        this.bodyPart = '';
    }

    componentDidMount() {
        this.setBodyPart();
        this.setId();
    }

    setBodyPart() {
        let part = randomNumber(3);
        switch (part) {
            case 0:
                this.bodyPart = "a Head";
                break;
            case 1:
                this.bodyPart = "a Body";
                break;
            case 2:
                this.bodyPart = "Legs";
                break;
            default:
                this.bodyPart = "a Head";
                break;
        }
    }

    setId() {
        const id = nanoid(4);
        this.setState({
            creatureId: id
        });
    }

    handleHistoryCallback = (childData) => {
        this.setState({
            lineHistory: [...this.state.lineHistory, childData]
        });
        //this is the history of line movement
        //all the moves theyve made!
    }

    changeColor(i) {
        this.setState({
            currentColor: i.color
        });
        
    }

    changeStatus(i) {
        //change the status of painting or erasing in here
        this.setState({
            status: i
        });
    }

    handleDone = (childData) => {
        //handle imagedata in here
        this.dataURL = childData;

        //start building save object
        const dataObj = {
            id: this.state.creatureId,
            type: this.bodyPart,
            data: {
                imageData: this.dataURL,
                borderColor: ''
            },
            createdOn: Date.now()
        };

        let response = fetch(config.url.API_URL + '/savePart', {
            method: 'POST',
            body: JSON.stringify(dataObj),
            headers: {
                'Content-type': 'application/json'
            }
        });
        console.log(response);
    }

    initiateDone() {
        this.doneTriggered = !this.doneTriggered;

        this.setState({
            finished: this.doneTriggered,
        })
    }

    handleToolChange() {
        //console.log("tool changed");
        //change the tool
        this.changeTool(!this.state.status);
    }

    changeTool(i) {
        this.setState({
            status: i

        });
        const slider = document.getElementsByClassName("slider round")[0];
        if (i) {
            slider.id = "pencil";

        } else slider.id = "eraser";
        // window.setTimeout(() => {
        //     if (i) {
        //         slider.id = "eraser";

        //     } else slider.id = "pencil";
        // }, .4 * 1000);
    }

    changeWidth(i) {
        this.setState({
            currentWidth: i.width
        });
    }

    renderColorPicker() {
        //loop thru object
        let pickers = [];
        this.state.colors.map((i) => {
            pickers.push(
                <Colorpicker key={i.color.toString()} value={i.color} onClick={() => this.changeColor(i)} />
            )
        });

        return pickers;
    }

    renderUndoButton() {
        return (
            <Button className="undoButton" onClick={() => this.removeLastLine()} />
        )
    }
    renderEraseButton() {
        return (
            <Button value={this.eraseTriggered} onClick={() => this.handleEraser()} style={{ background: this.bColor, color: this.textColor }} buttonText={"Erase"} />
        )
    }

    renderDoneButton() {
        return (
            <Button className="doneButton" onClick={() => this.initiateDone()} buttonText={"I'm Finished!"} />
        )
    }

    renderIdeasButton() {
        return (
            <Button className="rightButton ideas" id="ideas" onClick={() => this.initiateDone()} buttonText={"!"} />
        )
    }

    renderInstructionsButton() {
        return (
            <Button className="rightButton" id="instructions" onClick={() => this.initiateDone()} buttonText={"?"} />
        )
    }

    renderClearButton() {
        return (
            <Button className="rightButton" id="clear" onClick={() => this.initiateDone()} buttonText={"T"} />
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
            let id = "widthButton";

            if (i.width == this.state.currentWidth) {
                id = "selected";
            }

            widths.push(
                <LineWidthPicker className={id} key={i.width.toString()} value={i.width} onClick={() => this.changeWidth(i)} buttonText={i.size} />
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
        return (
            <div className="drawingPage">
                <div className='leftDrawing'>
                    <img className='logo' src={logo} alt="CreatureLab"></img>

                    <h2>Brush Stroke</h2>

                    <div className="linewidthpickerWrapper">
                        {this.renderLineWidthPicker()}
                    </div>

                    <CurrentColorIndicator className="currentColor" fill={this.state.currentColor} />
                    <div className="colorpickerWrapper">

                        {this.renderColorPicker()}
                    </div>

                    <div className="sliderDiv">
                        <label className="switchTool" >
                            <input type="checkbox"
                                checked={!this.state.status}
                                onChange={this.handleToolChange} ></input>
                            <span className="slider round" id="pencil"></span>
                        </label>
                    </div>
                </div>

                <Canvas strokeColor={this.state.currentColor}
                    historyCallback={this.handleHistoryCallback}
                    eraseTrigger={this.eraseTriggered}
                    undoTrigger={this.undoTriggered}
                    paintTrigger={this.paintTriggered}

                    doneTrigger={this.doneTriggered}
                    doneCallback={this.handleDone}

                    lineHistory={this.state.lineHistory}
                    lineWidth={this.state.currentWidth}
                    status={this.state.status}>
                </Canvas>

                <div className="rightDrawing" >
                    <div className='undoDiv'>
                        {this.renderUndoButton()}
                    </div>

                    <div className='taskDiv'>
                        <h2>Task:</h2>
                        <p>Please draw <p className="purpleP">{this.bodyPart}</p> for your creature!</p>
                    </div>

                    <div className='ideasDiv'>
                        <h2>Ideas</h2>
                        {this.renderIdeasButton()}
                    </div>

                    <div className='instructionsDiv'>
                        <h2>Instructions</h2>
                        {this.renderInstructionsButton()}
                    </div>

                    <div className='clearDiv'>
                        <h2>Clear All</h2>
                        {this.renderClearButton()}
                    </div>

                    <div className='doneDiv'>
                        {this.renderDoneButton()}
                    </div>
                </div>

            </div>
        );
    }

}

export default DrawingPage;