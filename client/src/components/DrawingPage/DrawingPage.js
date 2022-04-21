// this page stores refs to canvas history, and sets up all the components for the drawing page
//todo lol

import React from 'react';
import { instanceOf } from 'prop-types';
import Canvas from './Canvas';
import Colorpicker from './Colorpicker';
import Button from '../Button';
import LineWidthPicker from './LineWidthPicker';
import Popup from 'reactjs-popup';

import { ReactComponent as CurrentColorIndicator } from '../../data/assets/currentColorScribble.svg';
import { ReactComponent as BigSquiggle } from '../../data/assets/BigSquiggle.svg';
import { ReactComponent as MediumSquiggle } from '../../data/assets/MediumSquiggle.svg';
import { ReactComponent as SmallSquiggle } from '../../data/assets/SmallSquiggle.svg';
import { ReactComponent as Bulb } from '../../data/assets/LightBulb.svg';
import { ReactComponent as Trash } from '../../data/assets/Trash.svg';
import { ReactComponent as CreatureSVG } from '../../data/assets/Creature.svg';
import { ReactComponent as LabSVG } from '../../data/assets/Lab.svg';
import { ReactComponent as QuestionMark } from '../../data/assets/Question.svg';

import Switch from '../Switch';
import { randomNumber } from '../../utilities/util';
import { nanoid } from 'nanoid';
import { config } from '../../utilities/constants';
import { Cookies, withCookies } from 'react-cookie/lib';
import { Link, unstable_HistoryRouter } from 'react-router-dom';
import Instructions from './Instructions';
import { withNavigation } from './NavigationHook';
import ToolPlayer from './ToolPlayer';

class DrawingPage extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;

        this.state = {
            creatureId: '',
            colors: [
                { color: "#333333" }, //black
                { color: "#eb2727" }, //red
                { color: "#f89c14" }, //orange
                { color: "#f1de2d" }, //yellow
                { color: "#51ad42" }, //darkgreen
                { color: "#82de57" }, //lightgreen
                { color: "#1f32de" }, //darkblue
                { color: "#84b5fe" }, //lightblue
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
            currentLab: "#bb4bf0",
            currentWidth: "7",
            lineHistory: [],
            //true means we are drawing
            status: true,
            clear: false,
            finished: false,
            bodyPart: '',
            doneTrigger: false,
        }
        //this.currentLab = "#bb4bf0";

        this.removeLastLine = this.removeLastLine.bind(this);
        this.handleToolChange = this.handleToolChange.bind(this);

        this.indicatorStyle = {
            backgroundColor: this.state.currentColor,
        }

        this.undoTriggered = false;
        this.dataURL = '';

        this.borderColor = '';

        cookies.getAll();
    }

    componentDidMount() {
        this.setBodyPart();
        this.setId();
        this.setBorderColor();
    }

    setBodyPart() {
        let part = randomNumber(3);
        const setIt = (input) => this.setState({ bodyPart: input })

        switch (part) {
            case 0:
                setIt("Head")
                break;
            case 1:
                setIt("Body")
                break;
            case 2:
                setIt("Legs")
                break;
            default:
                setIt("Head")
                break;
        }
    }

    setBorderColor() {
        let color = this.state.colors[randomNumber(this.state.colors.length)].color;

        this.borderColor = color;
    }

    setId() {
        const { cookies } = this.props;
        //make an id - 5 for a little bit more security
        const id = nanoid(5);
        this.setState({
            creatureId: id
        });
        //set the cookie - we use this to reference in the combination pg

        cookies.set('creatureId', id, { path: '/' });
    }

    handleHistoryCallback = (childData) => {
        this.setState({
            lineHistory: [...this.state.lineHistory, childData]
        });
        //this is the history of line movement
        //all the moves theyve made!
    }

    changeColor(i) {
        //console.log(i);

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
            type: this.state.bodyPart,
            data: {
                imageData: this.dataURL,
                borderColor: this.borderColor
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

        response.then(() => {
            //saved :D
            this.props.navigate('/combine');
        })
    }

    initiateDone() {
        this.setState({
            doneTrigger: true
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

        //document.querySelector('.currentWidth').style.backgroundImage
    }

    renderColorPicker() {
        //loop thru object
        let pickers = [];
        this.state.colors.map((i) => {
            pickers.push(
                <Colorpicker className={i.color} key={i.color.toString()} value={i.color} onClick={() => this.changeColor(i)} />
            )
        });

        return pickers;
    }

    renderPopup() {
        console.log("instructions");
        return (Popup());
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
            <Button className="doneButton" onClick={() => this.initiateDone()} buttonText="I'm Finished!"></Button>
            //<DoneButton onClick={() => this.initiateDone}></DoneButton>
        )
    }

    renderIdeasButton() {
        return (
            <Button className="rightButton ideas" id="ideas" onClick={() => this.initiateDone()} buttonText={<Bulb></Bulb>} />
        )
    }

    renderInstructionsButton() {
        return (
            <Instructions className="test"></Instructions>
        )
    }

    renderClearButton() {
        return (
            <Button className="rightButton" id="clear" onClick={() => this.clearAll(!this.state.clear)} buttonText={<Trash stroke="white"></Trash>} />
        )
    }

    renderSmoothButton() {
        return (
            <Button onClick={this.toggleSmooth()} buttonText={"Smooth"} />
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

    renderLottie() {
        return (
            <ToolPlayer></ToolPlayer>
        )
    }

    changeLab() {
        const rand = Math.floor(Math.random()*this.state.colors.length);
        this.setState({
            currentLab: this.state.colors[rand].color
        });
        console.log(this.state.currentLab);

        // this.currentLab = this.state.colors[rand].color;
    }

    renderLogo() {
        return (
        <div className="logo" onClick={() => this.changeLab()}>
            <CreatureSVG></CreatureSVG>
            <LabSVG fill={this.state.currentLab}></LabSVG>
        </div>)
    }

    clearAll(i) {
        this.setState({
            clear: i,
        })
    }

    render() {
        return (
            <div className="drawingPage">
                <div className='leftDrawing'>
                    {this.renderLogo()}

                    <div className="lineWidthDiv">
                        <h3>Brush Stroke</h3>

                        <div className="linewidthpickerWrapper">
                            {this.renderLineWidthPicker()}
                        </div>

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
                            <span className="slider round" id="pencil">{this.renderLottie()}</span>
                        </label>
                    </div>
                </div>

                <Canvas strokeColor={this.state.currentColor}
                    historyCallback={this.handleHistoryCallback}
                    eraseTrigger={this.eraseTriggered}
                    undoTrigger={this.undoTriggered}
                    paintTrigger={this.paintTriggered}

                    doneTrigger={this.state.doneTrigger}
                    doneCallback={this.handleDone}

                    bodyPart={this.state.bodyPart}
                    lineHistory={this.state.lineHistory}
                    lineWidth={this.state.currentWidth}
                    status={this.state.status}

                    clear={this.state.clear}>

                </Canvas>

                <div className="rightDrawing" >
                    <div className='undoDiv'>
                        {this.renderUndoButton()}
                    </div>

                    <div className='taskDiv'>
                        <h2>Task:</h2>
                        <p align="center">Draw the <span className="purpleP">{this.state.bodyPart}</span> for your creature!</p>
                    </div>

                    <div className='buttonDiv'>
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
                    </div>

                    <div className='doneDiv'>
                        {this.renderDoneButton()}
                    </div>
                </div>

            </div>
        );
    }

}

//oh god
export default withCookies(withNavigation(DrawingPage));