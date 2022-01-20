// this page stores refs to canvas history, and sets up all the components for the drawing page
//todo lol

import React from 'react';
import { render } from 'react-dom';
import Canvas from './Canvas';
import Colorpicker from './Colorpicker';

class DrawingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: {
                red: "#f54242",
                black: "#000000",
                white: "#ffffff"
            },
            currentColor: "",
        }
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

    render() {
        return(
            <div className="drawingPage">
                <Canvas strokeColor={this.state.currentColor}></Canvas>
                {this.renderColorPicker('red')}
                {this.renderColorPicker('white')}
                {this.renderColorPicker('black')}
            </div>
        );
    }

}

export default DrawingPage;